import {
  RoleModel,
  UserModel,
  AuthService,
  AuthSession,
  roleGuard,
  AccessRule,
} from '../dist/esm/index.js';

import http from 'http';
import {TrieRouter} from '@e22m4u/js-trie-router';
import {ServiceContainer} from '@e22m4u/js-service';
import {DatabaseSchema} from '@e22m4u/js-repository';

const app = new ServiceContainer();
const router = app.get(TrieRouter);
const dbs = app.get(DatabaseSchema);

dbs.defineDatasource({
  name: 'memory',
  adapter: 'memory',
});

const authService = app.get(AuthService);
authService.registerModels({datasource: 'memory'});
authService.registerRequestHooks();

router.defineRoute({
  method: 'GET',
  path: '/users',
  handler(ctx) {
    const dbs = ctx.container.get(DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    return userRep.find();
  },
});

router.defineRoute({
  method: 'POST',
  path: '/users/register',
  handler(ctx) {
    const authService = ctx.container.getRegistered(AuthService);
    authService.requireAnyLoginId(ctx.body);
    return authService.createUser(ctx.body);
  },
});

router.defineRoute({
  method: 'POST',
  path: '/users/login',
  async handler(ctx) {
    const authService = ctx.container.getRegistered(AuthService);
    const user = await authService.findUserByLoginIds(ctx.body);
    await authService.verifyPassword(ctx.body.password, user.password);
    const accessToken = await authService.createAccessToken(user.id);
    const {token, expiresAt} = await authService.issueJwt(accessToken);
    return {token, expiresAt, user};
  },
});

router.defineRoute({
  method: 'GET',
  path: '/users/me',
  async handler(ctx) {
    const session = ctx.container.getRegistered(AuthSession);
    return session.getUser();
  },
});

router.defineRoute({
  method: 'PATCH',
  path: '/users/me',
  handler(ctx) {
    const session = ctx.container.getRegistered(AuthSession);
    const authService = ctx.container.getRegistered(AuthService);
    authService.requireAnyLoginId(ctx.body);
    return authService.updateUser(session.getUserId(), ctx.body);
  },
});

router.defineRoute({
  method: 'GET',
  path: '/users/logout',
  async handler(ctx) {
    const session = ctx.container.getRegistered(AuthSession);
    const accessTokenId = session.getAccessTokenId();
    const authService = ctx.container.getRegistered(AuthService);
    const success = await authService.removeAccessTokenById(accessTokenId);
    return {success};
  },
});

const server = new http.Server();
server.on('request', router.requestListener);

// слушаем входящие запросы
// на указанный адрес и порт
const port = 3000;
const host = '0.0.0.0';
server.listen(port, host, function () {
  const cyan = '\x1b[36m%s\x1b[0m';
  console.log(cyan, 'Server listening on port:', port);
  console.log(cyan, 'List users:', `curl http://${host}:${port}/users | jq`);
  console.log(cyan, 'Register a new user:',
    `curl -X POST http://${host}:${port}/users/register `
      + `-H "content-type: application/json" `
      + `-d '{"username": "andrew", "password": "andrewPass123"}' `
      + `| jq`,
  );
  console.log(cyan, 'Login with password:',
    `curl -X POST http://${host}:${port}/users/login `
      + `-H "content-type: application/json" `
      + `-d '{"username": "andrew", "password": "andrewPass123"}' `
      + `| jq`,
  );
  console.log(cyan, 'Get current user:',
    `curl http://${host}:${port}/users/me `
      + `-H "content-type: application/json" `
      + `-H "authorization: JWT_TOKEN_FROM_LOGIN" `
      + `| jq`,
  );
  console.log(cyan, 'Update current user:',
    `curl -X PATCH http://${host}:${port}/users/me `
      + `-H "content-type: application/json" `
      + `-H "authorization: JWT_TOKEN_FROM_LOGIN" `
      + `-d '{"firstName": "Andrew", "age": 27}' `
      + `| jq`,
  );
});
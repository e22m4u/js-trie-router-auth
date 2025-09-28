## @e22m4u/js-trie-router-auth

Подключаемый сервис авторизации с ролевой моделью.

Модуль встраивается в связку:

- [@e22m4u/js-service](https://www.npmjs.com/package/@e22m4u/js-service)
  \- Сервис-локатор;
- [@e22m4u/js-trie-router](https://www.npmjs.com/package/@e22m4u/js-trie-router)
  \- HTTP роутер на основе префиксного дерева;
- [@e22m4u/js-repository](https://www.npmjs.com/package/@e22m4u/js-repository)
  \- ORM/ODM для работы с базами данных;

## Установка

```bash
npm install @e22m4u/js-trie-router-auth
```

Модуль поддерживает ESM и CommonJS стандарты.

*ESM*

```js
import {AuthService} from '@e22m4u/js-trie-router-auth';
```

*CommonJS*

```js
const {AuthService} = require('@e22m4u/js-trie-router-auth');
```

## Использование

Модули `js-trie-router` и `js-repository` обычно работают в рамках одного
сервис-контейнера или корневого сервиса (*application*). Ниже рассматривается
первый вариант.

```js
import {TrieRouter} from '@e22m4u/js-trie-router';
import {ServiceContainer} from '@e22m4u/js-service';
import {DatabaseSchema} from '@e22m4u/js-trie-router';

const app = new ServiceContainer();
const router = app.get(TrieRouter);
const dbs = app.get(DatabaseSchema);
```

Так как после инъекции сервиса в контейнер потребуется вызвать метод регистрации
моделей и метод регистрации перехватчиков запроса, то инъекция будет выполняется
методом `app.get()`, чтобы сразу получить экземпляр `AuthService`.

```js
const authService = app.get(AuthService);
authService.registerModels({datasource: 'myDatasource'});
authService.registerRequestHooks();
```

На первой строке примера выше выполняется инъекция сервиса `AuthService`
без дополнительных аргументов, но вторым параметром метода `app.get()`
можно передать объект с настройками, как это показано ниже.

```ts
const authService = app.get(AuthService, {
  requireUsername: false,
  requireEmail: false,
  requirePhone: false,
  requirePassword: true,
  passwordHashRounds: 12,
  usernameFormatValidator,
  emailFormatValidator,
  phoneFormatValidator,
  passwordFormatValidator,
  jwtSecret: 'REPLACE_ME!',
  jwtTtl: 14 * 86400, // 14 days
  jwtHeaderName: 'authorization',
  jwtCookieName: 'accessToken',
  jwtQueryParam: 'accessToken',
});
```

WIP

## Тесты

```bash
npm run test
```

## Лицензия

MIT

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
// инъекция маршрутизатора и схемы баз данных
const router = app.get(TrieRouter);
const dbs = app.get(DatabaseSchema);

// для примера используется MongoDB адаптер
dbs.defineDatasource({
  name: 'myMongo',
  adapter: 'mongodb',
  // параметры адаптера
  host: '127.0.0.1',
  port: 27017,
  database: 'myDatabase',
});
```

*i. MongoDB адаптер устанавливается отдельно (см. [js-repository-mongodb-adapter](https://www.npmjs.com/package/@e22m4u/js-repository-mongodb-adapter)).*

### Интеграция AuthService

Для интеграции сервиса `AuthService` выполняется инъекция класса сервиса
в сервис-контейнер приложения и вызов некоторых методов предварительной
настройки. Так как после инъекции сразу потребуется экземпляр сервиса,
инъекция выполняется методом `app.get()`.

```js
const authService = app.get(AuthService); // см. 1
authService.registerModels({datasource: 'myMongo'}); // см. 2
authService.registerRequestHooks(); // регистрация перехватчиков запроса
```

1\. На первой строке примера выше выполняется инъекция сервиса авторизации
без дополнительных аргументов. Но вторым параметром метода `app.get()`
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

2\. На второй строке примера выполняется регистрация [моделей](#Модели)
с параметром `datasource`. В данном параметре требуется указать название
предварительно зарегистрированного
[источника данных](https://www.npmjs.com/package/@e22m4u/js-repository#источник-данных),
где будут храниться роли, пользователи и другие сущности.

WIP

## Модели

### BaseRole и Role

```js
{
  properties: {
    id: {
      type: 'any',
      primaryKey: true
    },
    name: {
      type: 'string',
      required: true,
      unique: 'sparse'
    },
    createdAt: {
      type: 'string',
      default: () => new Date().toISOString()
    }
  }
}
```

### BaseUser и User

```js
{
  properties: {
    id: {
      type: 'any',
      primaryKey: true
    },
    username: {
      type: 'string',
      unique: 'sparse',
      default: ''
    },
    email: {
      type: 'string',
      unique: 'sparse',
      default: ''
    },
    phone: {
      type: 'string',
      unique: 'sparse',
      default: ''
    },
    password: {
      type: 'string',
      default: ''
    },
    createdAt: {
      type: 'string',
      default: () => new Date().toISOString()
    },
    updatedAt: {
      type: 'string',
      default: () => new Date().toISOString()
    },
    roleIds{
      type: 'array',
      itemType: 'any',
      default: () => []
    }
  },
  relations: {
    roles: {
      type: 'referencesMany',
      model: 'Role',
      foreignKey: 'roleIds'
    }
  }
}
```

### BaseAccessToken и AccessToken

```js
{
  properties: {
    id: {
      type: 'any',
      primaryKey: true
    },
    userAgent: {
      type: 'string',
      default: ''
    },
    createdAt: {
      type: 'string',
      default: () => new Date().toISOString()
    },
    ownerId: {
      type: 'any',
      required: true,
    },
  },
  relations: {
    owner: {
      type: 'belongsTo',
      model: 'UserModel',
      foreignKey: 'ownerId'
    }
  }
}
```

## Тесты

```bash
npm run test
```

## Лицензия

MIT

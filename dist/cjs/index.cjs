"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// dist/esm/index.js
var index_exports = {};
__export(index_exports, {
  AccessRule: () => AccessRule,
  AccessTokenModel: () => AccessTokenModel,
  AuthLocalizer: () => AuthLocalizer,
  AuthService: () => AuthService,
  BaseAccessTokenModel: () => BaseAccessTokenModel,
  BaseRoleModel: () => BaseRoleModel,
  BaseUserModel: () => BaseUserModel,
  DEFAULT_AUTH_OPTIONS: () => DEFAULT_AUTH_OPTIONS,
  RoleModel: () => RoleModel,
  UserModel: () => UserModel,
  UserSession: () => UserSession,
  authLocalizer: () => authLocalizer,
  requireRole: () => requireRole,
  roleGuard: () => roleGuard
});
module.exports = __toCommonJS(index_exports);

// dist/esm/hooks/role-guard.js
var import_http_errors = __toESM(require("http-errors"), 1);

// dist/esm/utils/create-error.js
var import_util = require("util");
var import_js_format = require("@e22m4u/js-format");
function createError(ctor, code, message, details, ...args) {
  const msg = (0, import_js_format.format)(message, ...args);
  const error = new ctor(msg);
  Object.assign(error, { code });
  if (process.env["NODE_ENV"] !== "test") {
    const debugCtx = { error: msg, code, details };
    const inspectOptions = { showHidden: false, depth: null, colors: true };
    console.warn((0, import_util.inspect)(debugCtx, inspectOptions));
  }
  return error;
}
__name(createError, "createError");

// dist/esm/utils/remove-empty-keys.js
function removeEmptyKeys(plainObject, removeWhen = (v) => v == null) {
  return Object.fromEntries(Object.entries(plainObject).filter(([, value]) => !removeWhen(value)));
}
__name(removeEmptyKeys, "removeEmptyKeys");

// dist/esm/user-session.js
var _UserSession = class _UserSession {
  user;
  /**
   * Is logged in.
   */
  get isLoggedIn() {
    return Boolean(this.user);
  }
  /**
   * User id.
   */
  get userId() {
    var _a4;
    return (_a4 = this.user) == null ? void 0 : _a4.id;
  }
  /**
   * Roles.
   */
  get roles() {
    var _a4;
    return ((_a4 = this.user) == null ? void 0 : _a4.roles) || [];
  }
  /**
   * Role names.
   */
  get roleNames() {
    return this.roles.map((v) => v.name).filter(Boolean);
  }
  /**
   * Constructor.
   *
   * @param user
   */
  constructor(user) {
    this.user = user;
  }
};
__name(_UserSession, "UserSession");
var UserSession = _UserSession;

// dist/esm/auth-localizer.js
var import_js_localizer = require("@e22m4u/js-localizer");

// dist/esm/locales/en.json
var en_default = {
  "validators.dataFormatValidator.invalidUsernameFormatError": "Username can only contain Latin letters (a-z) and numbers (0-9)",
  "validators.dataFormatValidator.minUsernameLengthError": "Username must be at least %d characters long",
  "validators.dataFormatValidator.maxUsernameLengthError": "Username must not exceed %d characters",
  "validators.dataFormatValidator.usernameStartLetterError": "Username must start with a Latin letter",
  "validators.dataFormatValidator.invalidEmailFormatError": "Invalid email address format",
  "validators.dataFormatValidator.invalidPhoneFormatError": "Invalid phone number format",
  "validators.dataFormatValidator.invalidPasswordFormatError": "Password must contain at least one letter and one number",
  "validators.dataFormatValidator.minPasswordLengthError": "Password must be at least %d characters long",
  "validators.dataFormatValidator.maxPasswordLengthError": "Password must not exceed %d characters",
  "authorizationService.validateUserIdentifier.usernameRequiredError": "Please enter a username",
  "authorizationService.validateUserIdentifier.emailRequiredError": "Please enter an email address",
  "authorizationService.validateUserIdentifier.phoneRequiredError": "Please enter a phone number",
  "authorizationService.validateUserIdentifier.duplicateUsernameError": "This username is already taken",
  "authorizationService.validateUserIdentifier.duplicateEmailError": "This email address is already in use",
  "authorizationService.validateUserIdentifier.duplicatePhoneError": "This phone number is already in use",
  "authorizationService.createUser.identifierRequiredError": "A username, email address, or phone number is required",
  "authorizationService.updateUser.identifierRequiredError": "Please provide a username, email address or phone number",
  "authorizationService.findUserAndValidatePassword.identifierRequiredError": "Please enter your username, email or phone number",
  "authorizationService.findUserAndValidatePassword.usernameRequiredError": "Please enter your username",
  "authorizationService.findUserAndValidatePassword.emailRequiredError": "Please enter your email address",
  "authorizationService.findUserAndValidatePassword.phoneRequiredError": "Please enter your phone number",
  "authorizationService.findUserAndValidatePassword.loginFailedError": "Invalid login or password",
  "authorizationService.verifyJwtAndFindItsOwner.ownerNotFound": "Your session has expired. Please log in again.",
  "roleGuard.authenticationRequired": "Authentication is required",
  "roleGuard.roleNotAllowed": "You do not have permissions to perform this action"
};

// dist/esm/locales/ru.json
var ru_default = {
  "validators.dataFormatValidator.invalidUsernameFormatError": "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043C\u043E\u0436\u0435\u0442 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043B\u0430\u0442\u0438\u043D\u0441\u043A\u0438\u0435 \u0431\u0443\u043A\u0432\u044B (a-z) \u0438 \u0446\u0438\u0444\u0440\u044B (0-9)",
  "validators.dataFormatValidator.minUsernameLengthError": "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 %d \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432",
  "validators.dataFormatValidator.maxUsernameLengthError": "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C %d \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432",
  "validators.dataFormatValidator.usernameStartLetterError": "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 \u043B\u0430\u0442\u0438\u043D\u0441\u043A\u043E\u0439 \u0431\u0443\u043A\u0432\u044B",
  "validators.dataFormatValidator.invalidEmailFormatError": "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0430\u0434\u0440\u0435\u0441\u0430 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B",
  "validators.dataFormatValidator.invalidPhoneFormatError": "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u043D\u043E\u043C\u0435\u0440\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
  "validators.dataFormatValidator.invalidPasswordFormatError": "\u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043A\u0430\u043A \u043C\u0438\u043D\u0438\u043C\u0443\u043C \u043E\u0434\u043D\u0443 \u0431\u0443\u043A\u0432\u0443 \u0438 \u043E\u0434\u043D\u0443 \u0446\u0438\u0444\u0440\u0443",
  "validators.dataFormatValidator.minPasswordLengthError": "\u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 %d \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432",
  "validators.dataFormatValidator.maxPasswordLengthError": "\u041F\u0430\u0440\u043E\u043B\u044C \u043D\u0435 \u0434\u043E\u043B\u0436\u0435\u043D \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C %d \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432",
  "authorizationService.validateUserIdentifier.usernameRequiredError": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",
  "authorizationService.validateUserIdentifier.emailRequiredError": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B",
  "authorizationService.validateUserIdentifier.phoneRequiredError": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
  "authorizationService.validateUserIdentifier.duplicateUsernameError": "\u042D\u0442\u043E \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0443\u0436\u0435 \u0437\u0430\u043D\u044F\u0442\u043E",
  "authorizationService.validateUserIdentifier.duplicateEmailError": "\u042D\u0442\u043E\u0442 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B \u0443\u0436\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F",
  "authorizationService.validateUserIdentifier.duplicatePhoneError": "\u042D\u0442\u043E\u0442 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430 \u0443\u0436\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F",
  "authorizationService.createUser.identifierRequiredError": "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F, \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
  "authorizationService.updateUser.identifierRequiredError": "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F, \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
  "authorizationService.findUserAndValidatePassword.identifierRequiredError": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F, \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
  "authorizationService.findUserAndValidatePassword.usernameRequiredError": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",
  "authorizationService.findUserAndValidatePassword.emailRequiredError": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B",
  "authorizationService.findUserAndValidatePassword.phoneRequiredError": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
  "authorizationService.findUserAndValidatePassword.loginFailedError": "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C",
  "authorizationService.verifyJwtAndFindItsOwner.ownerNotFound": "\u0412\u0430\u0448\u0430 \u0441\u0435\u0441\u0441\u0438\u044F \u0438\u0441\u0442\u0435\u043A\u043B\u0430. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u043E\u0439\u0434\u0438\u0442\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E",
  "roleGuard.authenticationRequired": "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F",
  "roleGuard.roleNotAllowed": "\u0423 \u0432\u0430\u0441 \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043F\u0440\u0430\u0432 \u0434\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F"
};

// dist/esm/auth-localizer.js
var _AuthLocalizer = class _AuthLocalizer extends import_js_localizer.Localizer {
};
__name(_AuthLocalizer, "AuthLocalizer");
var AuthLocalizer = _AuthLocalizer;
var authLocalizer = new AuthLocalizer({
  dictionaries: { en: en_default, ru: ru_default }
});

// dist/esm/hooks/role-guard.js
var AccessRule = {
  AUTHENTICATED: "$authenticated"
};
function roleGuard(roleName) {
  return function(ctx) {
    const localizer = ctx.container.getRegistered(AuthLocalizer);
    const session = ctx.container.getRegistered(UserSession);
    if (!session.user)
      throw createError(import_http_errors.default.Unauthorized, "AUTHORIZATION_REQUIRED", localizer.t("roleGuard.authenticationRequired"));
    const roleNames = !Array.isArray(roleName) ? [roleName].filter(Boolean) : roleName;
    if (!roleNames.length || roleNames.includes(AccessRule.AUTHENTICATED)) {
      return;
    }
    const isAllowed = session.roleNames.some((v) => roleNames.includes(v));
    if (!isAllowed)
      throw createError(import_http_errors.default.Forbidden, "ROLE_NOT_ALLOWED", localizer.t("roleGuard.roleNotAllowed"));
  };
}
__name(roleGuard, "roleGuard");

// dist/esm/auth-service.js
var import_bcrypt = __toESM(require("bcrypt"), 1);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var import_uuid = require("uuid");
var import_http_errors6 = __toESM(require("http-errors"), 1);

// dist/esm/models/role-model.js
var import_js_repository = require("@e22m4u/js-repository");
var import_js_repository_decorators = require("@e22m4u/js-repository-decorators");
var import_js_repository2 = require("@e22m4u/js-repository");
var import_js_repository_decorators2 = require("@e22m4u/js-repository-decorators");
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
var BaseRoleModel = (_a = class {
  id;
  name;
  createdAt;
}, __name(_a, "BaseRoleModel"), _a);
__decorate([
  (0, import_js_repository_decorators2.property)({
    type: import_js_repository.DataType.ANY,
    primaryKey: true
  }),
  __metadata("design:type", Object)
], BaseRoleModel.prototype, "id", void 0);
__decorate([
  (0, import_js_repository_decorators2.property)({
    type: import_js_repository.DataType.STRING,
    required: true,
    unique: import_js_repository2.PropertyUniqueness.STRICT
  }),
  __metadata("design:type", String)
], BaseRoleModel.prototype, "name", void 0);
__decorate([
  (0, import_js_repository_decorators2.property)({
    type: import_js_repository.DataType.STRING,
    default: /* @__PURE__ */ __name(() => (/* @__PURE__ */ new Date()).toISOString(), "default")
  }),
  __metadata("design:type", String)
], BaseRoleModel.prototype, "createdAt", void 0);
BaseRoleModel = __decorate([
  (0, import_js_repository_decorators.model)()
], BaseRoleModel);
var _RoleModel = class _RoleModel extends BaseRoleModel {
};
__name(_RoleModel, "RoleModel");
var RoleModel = _RoleModel;

// dist/esm/models/user-model.js
var import_ts_projection = require("@e22m4u/ts-projection");
var import_js_repository3 = require("@e22m4u/js-repository");
var import_ts_projection2 = require("@e22m4u/ts-projection");
var import_js_repository4 = require("@e22m4u/js-repository");
var import_js_repository_decorators3 = require("@e22m4u/js-repository-decorators");
var import_js_repository5 = require("@e22m4u/js-repository");
var import_js_repository_decorators4 = require("@e22m4u/js-repository-decorators");
var import_js_repository_decorators5 = require("@e22m4u/js-repository-decorators");
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata2 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a2;
var BaseUserModel = (_a2 = class {
  id;
  username;
  email;
  phone;
  password;
  createdAt;
  updatedAt;
  roleIds;
  roles;
}, __name(_a2, "BaseUserModel"), _a2);
__decorate2([
  (0, import_js_repository_decorators4.property)({
    type: import_js_repository3.DataType.ANY,
    primaryKey: true
  }),
  __metadata2("design:type", Object)
], BaseUserModel.prototype, "id", void 0);
__decorate2([
  (0, import_js_repository_decorators4.property)({
    type: import_js_repository3.DataType.STRING,
    unique: import_js_repository5.PropertyUniqueness.SPARSE,
    default: ""
  }),
  __metadata2("design:type", String)
], BaseUserModel.prototype, "username", void 0);
__decorate2([
  (0, import_js_repository_decorators4.property)({
    type: import_js_repository3.DataType.STRING,
    unique: import_js_repository5.PropertyUniqueness.SPARSE,
    default: ""
  }),
  __metadata2("design:type", String)
], BaseUserModel.prototype, "email", void 0);
__decorate2([
  (0, import_js_repository_decorators4.property)({
    type: import_js_repository3.DataType.STRING,
    unique: import_js_repository5.PropertyUniqueness.SPARSE,
    default: ""
  }),
  __metadata2("design:type", String)
], BaseUserModel.prototype, "phone", void 0);
__decorate2([
  (0, import_js_repository_decorators4.property)({
    type: import_js_repository3.DataType.STRING,
    default: ""
  }),
  (0, import_ts_projection2.noOutput)(),
  __metadata2("design:type", String)
], BaseUserModel.prototype, "password", void 0);
__decorate2([
  (0, import_js_repository_decorators4.property)({
    type: import_js_repository3.DataType.STRING,
    default: /* @__PURE__ */ __name(() => (/* @__PURE__ */ new Date()).toISOString(), "default")
  }),
  (0, import_ts_projection.noInput)(),
  __metadata2("design:type", String)
], BaseUserModel.prototype, "createdAt", void 0);
__decorate2([
  (0, import_js_repository_decorators4.property)({
    type: import_js_repository3.DataType.STRING,
    default: /* @__PURE__ */ __name(() => (/* @__PURE__ */ new Date()).toISOString(), "default")
  }),
  __metadata2("design:type", String)
], BaseUserModel.prototype, "updatedAt", void 0);
__decorate2([
  (0, import_js_repository_decorators4.property)({
    type: import_js_repository3.DataType.ARRAY,
    itemType: import_js_repository3.DataType.ANY,
    default: /* @__PURE__ */ __name(() => [], "default")
  }),
  __metadata2("design:type", Array)
], BaseUserModel.prototype, "roleIds", void 0);
__decorate2([
  (0, import_js_repository_decorators5.relation)({
    type: import_js_repository4.RelationType.REFERENCES_MANY,
    model: RoleModel.name,
    foreignKey: "roleIds"
  }),
  __metadata2("design:type", Array)
], BaseUserModel.prototype, "roles", void 0);
BaseUserModel = __decorate2([
  (0, import_js_repository_decorators3.model)()
], BaseUserModel);
var _UserModel = class _UserModel extends BaseUserModel {
};
__name(_UserModel, "UserModel");
var UserModel = _UserModel;

// dist/esm/models/access-token-model.js
var import_js_repository6 = require("@e22m4u/js-repository");
var import_js_repository7 = require("@e22m4u/js-repository");
var import_js_repository_decorators6 = require("@e22m4u/js-repository-decorators");
var import_js_repository_decorators7 = require("@e22m4u/js-repository-decorators");
var import_js_repository_decorators8 = require("@e22m4u/js-repository-decorators");
var __decorate3 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata3 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a3;
var BaseAccessTokenModel = (_a3 = class {
  id;
  userAgent;
  createdAt;
  ownerId;
  owner;
}, __name(_a3, "BaseAccessTokenModel"), _a3);
__decorate3([
  (0, import_js_repository_decorators7.property)({
    type: import_js_repository6.DataType.ANY,
    primaryKey: true
  }),
  __metadata3("design:type", Object)
], BaseAccessTokenModel.prototype, "id", void 0);
__decorate3([
  (0, import_js_repository_decorators7.property)({
    type: import_js_repository6.DataType.STRING,
    default: ""
  }),
  __metadata3("design:type", String)
], BaseAccessTokenModel.prototype, "userAgent", void 0);
__decorate3([
  (0, import_js_repository_decorators7.property)({
    type: import_js_repository6.DataType.STRING,
    default: /* @__PURE__ */ __name(() => (/* @__PURE__ */ new Date()).toISOString(), "default")
  }),
  __metadata3("design:type", String)
], BaseAccessTokenModel.prototype, "createdAt", void 0);
__decorate3([
  (0, import_js_repository_decorators7.property)({
    type: import_js_repository6.DataType.ANY,
    required: true
  }),
  __metadata3("design:type", Object)
], BaseAccessTokenModel.prototype, "ownerId", void 0);
__decorate3([
  (0, import_js_repository_decorators8.relation)({
    type: import_js_repository7.RelationType.BELONGS_TO,
    model: UserModel.name,
    foreignKey: "ownerId"
  }),
  __metadata3("design:type", Object)
], BaseAccessTokenModel.prototype, "owner", void 0);
BaseAccessTokenModel = __decorate3([
  (0, import_js_repository_decorators6.model)()
], BaseAccessTokenModel);
var _AccessTokenModel = class _AccessTokenModel extends BaseAccessTokenModel {
};
__name(_AccessTokenModel, "AccessTokenModel");
var AccessTokenModel = _AccessTokenModel;

// dist/esm/auth-service.js
var import_js_localizer2 = require("@e22m4u/js-localizer");
var import_js_trie_router = require("@e22m4u/js-trie-router");
var import_js_repository8 = require("@e22m4u/js-repository");
var import_js_repository9 = require("@e22m4u/js-repository");

// node_modules/@e22m4u/js-service/src/errors/invalid-argument-error.js
var import_js_format2 = require("@e22m4u/js-format");
var _InvalidArgumentError = class _InvalidArgumentError extends import_js_format2.Errorf {
};
__name(_InvalidArgumentError, "InvalidArgumentError");
var InvalidArgumentError = _InvalidArgumentError;

// node_modules/@e22m4u/js-service/src/service-container.js
var SERVICE_CONTAINER_CLASS_NAME = "ServiceContainer";
var _ServiceContainer = class _ServiceContainer {
  /**
   * Services map.
   *
   * @type {Map<any, any>}
   * @private
   */
  _services = /* @__PURE__ */ new Map();
  /**
   * Parent container.
   *
   * @type {ServiceContainer}
   * @private
   */
  _parent;
  /**
   * Constructor.
   *
   * @param {ServiceContainer|undefined} parent
   */
  constructor(parent = void 0) {
    if (parent != null) {
      if (!(parent instanceof _ServiceContainer))
        throw new InvalidArgumentError(
          'The provided parameter "parent" of ServicesContainer.constructor must be an instance ServiceContainer, but %v given.',
          parent
        );
      this._parent = parent;
    }
  }
  /**
   * Получить родительский сервис-контейнер или выбросить ошибку.
   *
   * @returns {ServiceContainer}
   */
  getParent() {
    if (!this._parent)
      throw new InvalidArgumentError("The service container has no parent.");
    return this._parent;
  }
  /**
   * Проверить наличие родительского сервис-контейнера.
   *
   * @returns {boolean}
   */
  hasParent() {
    return Boolean(this._parent);
  }
  /**
   * Получить существующий или новый экземпляр.
   *
   * @param {*} ctor
   * @param {*} args
   * @returns {*}
   */
  get(ctor, ...args) {
    if (!ctor || typeof ctor !== "function")
      throw new InvalidArgumentError(
        "The first argument of ServicesContainer.get must be a class constructor, but %v given.",
        ctor
      );
    if (!this._services.has(ctor) && this._parent && this._parent.has(ctor)) {
      return this._parent.get(ctor);
    }
    let service = this._services.get(ctor);
    if (!service) {
      const ctors = this._services.keys();
      const inheritedCtor = ctors.find((v) => v.prototype instanceof ctor);
      if (inheritedCtor) {
        service = this._services.get(inheritedCtor);
        ctor = inheritedCtor;
      }
    }
    if (!service || args.length) {
      service = Array.isArray(ctor.kinds) && ctor.kinds.includes(SERVICE_CLASS_NAME) ? new ctor(this, ...args) : new ctor(...args);
      this._services.set(ctor, service);
    } else if (typeof service === "function") {
      service = service();
      this._services.set(ctor, service);
    }
    return service;
  }
  /**
   * Получить существующий или новый экземпляр,
   * только если конструктор зарегистрирован.
   *
   * @param {*} ctor
   * @param {*} args
   * @returns {*}
   */
  getRegistered(ctor, ...args) {
    if (!this.has(ctor))
      throw new InvalidArgumentError(
        "The constructor %v is not registered.",
        ctor
      );
    return this.get(ctor, ...args);
  }
  /**
   * Проверить существование конструктора в контейнере.
   *
   * @param {*} ctor
   * @returns {boolean}
   */
  has(ctor) {
    if (this._services.has(ctor)) return true;
    if (this._parent) return this._parent.has(ctor);
    const ctors = this._services.keys();
    const inheritedCtor = ctors.find((v) => v.prototype instanceof ctor);
    if (inheritedCtor) return true;
    return false;
  }
  /**
   * Добавить конструктор в контейнер.
   *
   * @param {*} ctor
   * @param {*} args
   * @returns {this}
   */
  add(ctor, ...args) {
    if (!ctor || typeof ctor !== "function")
      throw new InvalidArgumentError(
        "The first argument of ServicesContainer.add must be a class constructor, but %v given.",
        ctor
      );
    const factory = /* @__PURE__ */ __name(() => Array.isArray(ctor.kinds) && ctor.kinds.includes(SERVICE_CLASS_NAME) ? new ctor(this, ...args) : new ctor(...args), "factory");
    this._services.set(ctor, factory);
    return this;
  }
  /**
   * Добавить конструктор и создать экземпляр.
   *
   * @param {*} ctor
   * @param {*} args
   * @returns {this}
   */
  use(ctor, ...args) {
    if (!ctor || typeof ctor !== "function")
      throw new InvalidArgumentError(
        "The first argument of ServicesContainer.use must be a class constructor, but %v given.",
        ctor
      );
    const service = Array.isArray(ctor.kinds) && ctor.kinds.includes(SERVICE_CLASS_NAME) ? new ctor(this, ...args) : new ctor(...args);
    this._services.set(ctor, service);
    return this;
  }
  /**
   * Добавить конструктор и связанный экземпляр.
   *
   * @param {*} ctor
   * @param {*} service
   * @returns {this}
   */
  set(ctor, service) {
    if (!ctor || typeof ctor !== "function")
      throw new InvalidArgumentError(
        "The first argument of ServicesContainer.set must be a class constructor, but %v given.",
        ctor
      );
    if (!service || typeof service !== "object" || Array.isArray(service))
      throw new InvalidArgumentError(
        "The second argument of ServicesContainer.set must be an Object, but %v given.",
        service
      );
    this._services.set(ctor, service);
    return this;
  }
};
__name(_ServiceContainer, "ServiceContainer");
/**
 * Kinds.
 *
 * @type {string[]}
 */
__publicField(_ServiceContainer, "kinds", [SERVICE_CONTAINER_CLASS_NAME]);
var ServiceContainer = _ServiceContainer;

// node_modules/@e22m4u/js-service/src/utils/is-service-container.js
function isServiceContainer(container) {
  return Boolean(
    container && typeof container === "object" && typeof container.constructor === "function" && Array.isArray(container.constructor.kinds) && container.constructor.kinds.includes(SERVICE_CONTAINER_CLASS_NAME)
  );
}
__name(isServiceContainer, "isServiceContainer");

// node_modules/@e22m4u/js-service/src/service.js
var SERVICE_CLASS_NAME = "Service";
var _Service = class _Service {
  /**
   * Container.
   *
   * @type {ServiceContainer}
   */
  container;
  /**
   * Constructor.
   *
   * @param {ServiceContainer|undefined} container
   */
  constructor(container = void 0) {
    this.container = isServiceContainer(container) ? container : new ServiceContainer();
  }
  /**
   * Получить существующий или новый экземпляр.
   *
   * @param {*} ctor
   * @param {*} args
   * @returns {*}
   */
  getService(ctor, ...args) {
    return this.container.get(ctor, ...args);
  }
  /**
   * Получить существующий или новый экземпляр,
   * только если конструктор зарегистрирован.
   *
   * @param {*} ctor
   * @param {*} args
   * @returns {*}
   */
  getRegisteredService(ctor, ...args) {
    return this.container.getRegistered(ctor, ...args);
  }
  /**
   * Проверка существования конструктора в контейнере.
   *
   * @param {*} ctor
   * @returns {boolean}
   */
  hasService(ctor) {
    return this.container.has(ctor);
  }
  /**
   * Добавить конструктор в контейнер.
   *
   * @param {*} ctor
   * @param {*} args
   * @returns {this}
   */
  addService(ctor, ...args) {
    this.container.add(ctor, ...args);
    return this;
  }
  /**
   * Добавить конструктор и создать экземпляр.
   *
   * @param {*} ctor
   * @param {*} args
   * @returns {this}
   */
  useService(ctor, ...args) {
    this.container.use(ctor, ...args);
    return this;
  }
  /**
   * Добавить конструктор и связанный экземпляр.
   *
   * @param {*} ctor
   * @param {*} service
   * @returns {this}
   */
  setService(ctor, service) {
    this.container.set(ctor, service);
    return this;
  }
};
__name(_Service, "Service");
/**
 * Kinds.
 *
 * @type {string[]}
 */
__publicField(_Service, "kinds", [SERVICE_CLASS_NAME]);
var Service = _Service;

// node_modules/@e22m4u/js-debug/src/utils/to-camel-case.js
function toCamelCase(input) {
  return input.replace(/(^\w|[A-Z]|\b\w)/g, (c) => c.toUpperCase()).replace(/\W+/g, "").replace(/(^\w)/g, (c) => c.toLowerCase());
}
__name(toCamelCase, "toCamelCase");

// node_modules/@e22m4u/js-debug/src/utils/is-non-array-object.js
function isNonArrayObject(input) {
  return Boolean(input && typeof input === "object" && !Array.isArray(input));
}
__name(isNonArrayObject, "isNonArrayObject");

// node_modules/@e22m4u/js-debug/src/utils/generate-random-hex.js
function generateRandomHex(length = 4) {
  if (length <= 0) {
    return "";
  }
  const firstCharCandidates = "abcdef";
  const restCharCandidates = "0123456789abcdef";
  let result = "";
  const firstCharIndex = Math.floor(Math.random() * firstCharCandidates.length);
  result += firstCharCandidates[firstCharIndex];
  for (let i = 1; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * restCharCandidates.length);
    result += restCharCandidates[randomIndex];
  }
  return result;
}
__name(generateRandomHex, "generateRandomHex");

// node_modules/@e22m4u/js-debug/src/debuggable.js
var _Debuggable = class _Debuggable {
  /**
   * Debug.
   *
   * @type {Function}
   */
  debug;
  /**
   * Ctor Debug.
   *
   * @type {Function}
   */
  ctorDebug;
  /**
   * Возвращает функцию-отладчик с сегментом пространства имен
   * указанного в параметре метода.
   *
   * @param {Function} method
   * @returns {Function}
   */
  getDebuggerFor(method) {
    return this.debug.withHash().withNs(method.name);
  }
  /**
   * Constructor.
   *
   * @param {object|undefined} container
   * @param {DebuggableOptions|undefined} options
   */
  constructor(options = void 0) {
    const className = toCamelCase(this.constructor.name);
    options = typeof options === "object" && options || {};
    const namespace = options.namespace && String(options.namespace) || void 0;
    if (namespace) {
      this.debug = createDebugger(namespace, className);
    } else {
      this.debug = createDebugger(className);
    }
    const noEnvNs = Boolean(options.noEnvNs);
    if (noEnvNs) this.debug = this.debug.withoutEnvNs();
    this.ctorDebug = this.debug.withNs("constructor").withHash();
    this.ctorDebug(_Debuggable.INSTANTIATION_MESSAGE);
  }
};
__name(_Debuggable, "Debuggable");
/**
 * Instantiation message;
 *
 * @type {string}
 */
__publicField(_Debuggable, "INSTANTIATION_MESSAGE", "Instantiated.");
var Debuggable = _Debuggable;

// node_modules/@e22m4u/js-debug/src/create-debugger.js
var import_js_format3 = require("@e22m4u/js-format");
var import_js_format4 = require("@e22m4u/js-format");

// node_modules/@e22m4u/js-debug/src/create-colorized-dump.js
var import_util2 = require("util");
var INSPECT_OPTIONS = {
  showHidden: false,
  depth: null,
  colors: true,
  compact: false
};
function createColorizedDump(value) {
  return (0, import_util2.inspect)(value, INSPECT_OPTIONS);
}
__name(createColorizedDump, "createColorizedDump");

// node_modules/@e22m4u/js-debug/src/create-debugger.js
var AVAILABLE_COLORS = [
  20,
  21,
  26,
  27,
  32,
  33,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  56,
  57,
  62,
  63,
  68,
  69,
  74,
  75,
  76,
  77,
  78,
  79,
  80,
  81,
  92,
  93,
  98,
  99,
  112,
  113,
  128,
  129,
  134,
  135,
  148,
  149,
  160,
  161,
  162,
  163,
  164,
  165,
  166,
  167,
  168,
  169,
  170,
  171,
  172,
  173,
  178,
  179,
  184,
  185,
  196,
  197,
  198,
  199,
  200,
  201,
  202,
  203,
  204,
  205,
  206,
  207,
  208,
  209,
  214,
  215,
  220,
  221
];
var DEFAULT_OFFSET_STEP_SPACES = 2;
function pickColorCode(input) {
  if (typeof input !== "string")
    throw new import_js_format3.Errorf(
      'The parameter "input" of the function pickColorCode must be a String, but %v given.',
      input
    );
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return AVAILABLE_COLORS[Math.abs(hash) % AVAILABLE_COLORS.length];
}
__name(pickColorCode, "pickColorCode");
function wrapStringByColorCode(input, color) {
  if (typeof input !== "string")
    throw new import_js_format3.Errorf(
      'The parameter "input" of the function wrapStringByColorCode must be a String, but %v given.',
      input
    );
  if (typeof color !== "number")
    throw new import_js_format3.Errorf(
      'The parameter "color" of the function wrapStringByColorCode must be a Number, but %v given.',
      color
    );
  const colorCode = "\x1B[3" + (Number(color) < 8 ? color : "8;5;" + color);
  return `${colorCode};1m${input}\x1B[0m`;
}
__name(wrapStringByColorCode, "wrapStringByColorCode");
function matchPattern(pattern, input) {
  if (typeof pattern !== "string")
    throw new import_js_format3.Errorf(
      'The parameter "pattern" of the function matchPattern must be a String, but %v given.',
      pattern
    );
  if (typeof input !== "string")
    throw new import_js_format3.Errorf(
      'The parameter "input" of the function matchPattern must be a String, but %v given.',
      input
    );
  const regexpStr = pattern.replace(/\*/g, ".*?");
  const regexp = new RegExp("^" + regexpStr + "$");
  return regexp.test(input);
}
__name(matchPattern, "matchPattern");
function createDebugger(namespaceOrOptions = void 0, ...namespaceSegments) {
  if (namespaceOrOptions && typeof namespaceOrOptions !== "string" && !isNonArrayObject(namespaceOrOptions)) {
    throw new import_js_format3.Errorf(
      'The parameter "namespace" of the function createDebugger must be a String or an Object, but %v given.',
      namespaceOrOptions
    );
  }
  const withCustomState = isNonArrayObject(namespaceOrOptions);
  const state = withCustomState ? namespaceOrOptions : {};
  state.envNsSegments = Array.isArray(state.envNsSegments) ? state.envNsSegments : [];
  state.nsSegments = Array.isArray(state.nsSegments) ? state.nsSegments : [];
  state.pattern = typeof state.pattern === "string" ? state.pattern : "";
  state.hash = typeof state.hash === "string" ? state.hash : "";
  state.offsetSize = typeof state.offsetSize === "number" ? state.offsetSize : 0;
  state.offsetStep = typeof state.offsetStep !== "string" ? " ".repeat(DEFAULT_OFFSET_STEP_SPACES) : state.offsetStep;
  state.delimiter = state.delimiter && typeof state.delimiter === "string" ? state.delimiter : ":";
  if (!withCustomState) {
    if (typeof process !== "undefined" && process.env && process.env["DEBUGGER_NAMESPACE"]) {
      state.envNsSegments.push(process.env.DEBUGGER_NAMESPACE);
    }
    if (typeof namespaceOrOptions === "string")
      state.nsSegments.push(namespaceOrOptions);
  }
  namespaceSegments.forEach((segment) => {
    if (!segment || typeof segment !== "string")
      throw new import_js_format3.Errorf(
        "Namespace segment must be a non-empty String, but %v given.",
        segment
      );
    state.nsSegments.push(segment);
  });
  if (typeof process !== "undefined" && process.env && process.env["DEBUG"]) {
    state.pattern = process.env["DEBUG"];
  } else if (typeof localStorage !== "undefined" && typeof localStorage.getItem("debug") === "string") {
    state.pattern = localStorage.getItem("debug");
  }
  const isDebuggerEnabled = /* @__PURE__ */ __name(() => {
    const nsStr = [...state.envNsSegments, ...state.nsSegments].join(
      state.delimiter
    );
    const patterns = state.pattern.split(/[\s,]+/).filter((p) => p.length > 0);
    if (patterns.length === 0 && state.pattern !== "*") return false;
    for (const singlePattern of patterns) {
      if (matchPattern(singlePattern, nsStr)) return true;
    }
    return false;
  }, "isDebuggerEnabled");
  const getPrefix = /* @__PURE__ */ __name(() => {
    let tokens = [];
    [...state.envNsSegments, ...state.nsSegments, state.hash].filter(Boolean).forEach((token) => {
      const extractedTokens = token.split(state.delimiter).filter(Boolean);
      tokens = [...tokens, ...extractedTokens];
    });
    let res = tokens.reduce((acc, token, index) => {
      const isLast = tokens.length - 1 === index;
      const tokenColor = pickColorCode(token);
      acc += wrapStringByColorCode(token, tokenColor);
      if (!isLast) acc += state.delimiter;
      return acc;
    }, "");
    if (state.offsetSize > 0) res += state.offsetStep.repeat(state.offsetSize);
    return res;
  }, "getPrefix");
  function debugFn(messageOrData, ...args) {
    if (!isDebuggerEnabled()) return;
    const prefix = getPrefix();
    const multiString = (0, import_js_format4.format)(messageOrData, ...args);
    const rows = multiString.split("\n");
    rows.forEach((message) => {
      prefix ? console.log(`${prefix} ${message}`) : console.log(message);
    });
  }
  __name(debugFn, "debugFn");
  debugFn.withNs = function(namespace, ...args) {
    const stateCopy = JSON.parse(JSON.stringify(state));
    [namespace, ...args].forEach((ns) => {
      if (!ns || typeof ns !== "string")
        throw new import_js_format3.Errorf(
          "Debugger namespace must be a non-empty String, but %v given.",
          ns
        );
      stateCopy.nsSegments.push(ns);
    });
    return createDebugger(stateCopy);
  };
  debugFn.withHash = function(hashLength = 4) {
    const stateCopy = JSON.parse(JSON.stringify(state));
    if (!hashLength || typeof hashLength !== "number" || hashLength < 1) {
      throw new import_js_format3.Errorf(
        "Debugger hash must be a positive Number, but %v given.",
        hashLength
      );
    }
    stateCopy.hash = generateRandomHex(hashLength);
    return createDebugger(stateCopy);
  };
  debugFn.withOffset = function(offsetSize) {
    const stateCopy = JSON.parse(JSON.stringify(state));
    if (!offsetSize || typeof offsetSize !== "number" || offsetSize < 1) {
      throw new import_js_format3.Errorf(
        "Debugger offset must be a positive Number, but %v given.",
        offsetSize
      );
    }
    stateCopy.offsetSize = offsetSize;
    return createDebugger(stateCopy);
  };
  debugFn.withoutEnvNs = function() {
    const stateCopy = JSON.parse(JSON.stringify(state));
    stateCopy.envNsSegments = [];
    return createDebugger(stateCopy);
  };
  debugFn.inspect = function(valueOrDesc, ...args) {
    if (!isDebuggerEnabled()) return;
    const prefix = getPrefix();
    let multiString = "";
    if (typeof valueOrDesc === "string" && args.length) {
      multiString += `${valueOrDesc}
`;
      const multilineDump = args.map((v) => createColorizedDump(v)).join("\n");
      const dumpRows = multilineDump.split("\n");
      multiString += dumpRows.map((v) => `${state.offsetStep}${v}`).join("\n");
    } else {
      multiString += [valueOrDesc, ...args].map((v) => createColorizedDump(v)).join("\n");
    }
    const rows = multiString.split("\n");
    rows.forEach((message) => {
      prefix ? console.log(`${prefix} ${message}`) : console.log(message);
    });
  };
  debugFn.state = state;
  return debugFn;
}
__name(createDebugger, "createDebugger");

// node_modules/@e22m4u/js-service/src/debuggable-service.js
var _DebuggableService = class _DebuggableService extends Debuggable {
  /**
   * Service.
   *
   * @type {Service}
   */
  _service;
  /**
   * Container.
   *
   * @type {ServiceContainer}
   */
  get container() {
    return this._service.container;
  }
  /**
   * Получить существующий или новый экземпляр.
   *
   * @type {Service['getService']}
   */
  get getService() {
    return this._service.getService;
  }
  /**
   * Получить существующий или новый экземпляр,
   * только если конструктор зарегистрирован.
   *
   * @type {Service['getRegisteredService']}
   */
  get getRegisteredService() {
    return this._service.getRegisteredService;
  }
  /**
   * Проверка существования конструктора в контейнере.
   *
   * @type {Service['hasService']}
   */
  get hasService() {
    return this._service.hasService;
  }
  /**
   * Добавить конструктор в контейнер.
   *
   * @type {Service['addService']}
   */
  get addService() {
    return this._service.addService;
  }
  /**
   * Добавить конструктор и создать экземпляр.
   *
   * @type {Service['useService']}
   */
  get useService() {
    return this._service.useService;
  }
  /**
   * Добавить конструктор и связанный экземпляр.
   *
   * @type {Service['setService']}
   */
  get setService() {
    return this._service.setService;
  }
  /**
   * Constructor.
   *
   * @param {ServiceContainer|undefined} container
   * @param {import('@e22m4u/js-debug').DebuggableOptions|undefined} options
   */
  constructor(container = void 0, options = void 0) {
    super(options);
    this._service = new Service(container);
  }
};
__name(_DebuggableService, "DebuggableService");
/**
 * Kinds.
 *
 * @type {string[]}
 */
__publicField(_DebuggableService, "kinds", Service.kinds);
var DebuggableService = _DebuggableService;

// dist/esm/debuggable-service.js
var _DebuggableService2 = class _DebuggableService2 extends DebuggableService {
  /**
   * Constructor.
   *
   * @param container
   */
  constructor(container) {
    super(container, { noEnvNs: true, namespace: "" });
  }
};
__name(_DebuggableService2, "DebuggableService");
var DebuggableService2 = _DebuggableService2;

// dist/esm/validators/email-format-validator.js
var import_http_errors2 = __toESM(require("http-errors"), 1);
var EMAIL_FORMAT_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var emailFormatValidator = /* @__PURE__ */ __name(function(value, localizer) {
  if (!value || typeof value !== "string" || !EMAIL_FORMAT_REGEX.test(value))
    throw createError(import_http_errors2.default.BadRequest, "INVALID_EMAIL_FORMAT", localizer.t("validators.dataFormatValidator.invalidEmailFormatError"), { email: value });
}, "emailFormatValidator");

// dist/esm/validators/phone-format-validator.js
var import_http_errors3 = __toESM(require("http-errors"), 1);
var PHONE_FORMAT_REGEX = /^[+]?[0-9]{0,3}\W*[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
var phoneFormatValidator = /* @__PURE__ */ __name(function(value, localizer) {
  if (!value || typeof value !== "string" || !PHONE_FORMAT_REGEX.test(value))
    throw createError(import_http_errors3.default.BadRequest, "INVALID_PHONE_FORMAT", localizer.t("validators.dataFormatValidator.invalidPhoneFormatError"), { phone: value });
}, "phoneFormatValidator");

// dist/esm/validators/username-format-validator.js
var import_http_errors4 = __toESM(require("http-errors"), 1);
var MIN_USERNAME_LENGTH = 4;
var MAX_USERNAME_LENGTH = 30;
var usernameFormatValidator = /* @__PURE__ */ __name(function(value, localizer) {
  if (typeof value !== "string")
    throw createError(import_http_errors4.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("validators.dataFormatValidator.invalidUsernameFormatError"), { username: value });
  if (value.length < MIN_USERNAME_LENGTH)
    throw createError(import_http_errors4.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("validators.dataFormatValidator.minUsernameLengthError"), { username: value }, MIN_USERNAME_LENGTH);
  if (value.length > MAX_USERNAME_LENGTH)
    throw createError(import_http_errors4.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("validators.dataFormatValidator.maxUsernameLengthError"), { username: value }, MAX_USERNAME_LENGTH);
  if (!/^[a-zA-Z]/.test(value))
    throw createError(import_http_errors4.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("validators.dataFormatValidator.usernameStartLetterError"), { username: value });
  if (!/^[a-zA-Z0-9]+$/.test(value))
    throw createError(import_http_errors4.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("validators.dataFormatValidator.invalidUsernameFormatError"), { username: value });
}, "usernameFormatValidator");

// dist/esm/validators/password-format-validator.js
var import_http_errors5 = __toESM(require("http-errors"), 1);
var MIN_PASSWORD_LENGTH = 8;
var MAX_PASSWORD_LENGTH = 80;
var passwordFormatValidator = /* @__PURE__ */ __name(function(value, localizer) {
  if (typeof value !== "string")
    throw createError(import_http_errors5.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("validators.dataFormatValidator.invalidPasswordFormatError"), { password: value });
  if (value.length < MIN_PASSWORD_LENGTH)
    throw createError(import_http_errors5.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("validators.dataFormatValidator.minPasswordLengthError"), { password: value }, MIN_PASSWORD_LENGTH);
  if (value.length > MAX_PASSWORD_LENGTH)
    throw createError(import_http_errors5.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("validators.dataFormatValidator.maxPasswordLengthError"), { password: value }, MAX_PASSWORD_LENGTH);
  if (!new RegExp("\\p{L}", "u").test(value) || !new RegExp("\\p{N}", "u").test(value))
    throw createError(import_http_errors5.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("validators.dataFormatValidator.invalidPasswordFormatError"), { password: value });
}, "passwordFormatValidator");

// dist/esm/auth-service.js
var import_js_repository_decorators9 = require("@e22m4u/js-repository-decorators");
var AUTH_MODEL_LIST = [
  BaseRoleModel,
  BaseUserModel,
  BaseAccessTokenModel,
  RoleModel,
  UserModel,
  AccessTokenModel
];
var USER_LOGIN_IDENTIFIERS = ["username", "email", "phone"];
var DEFAULT_AUTH_OPTIONS = {
  requireUsername: false,
  requireEmail: false,
  requirePhone: false,
  requirePassword: true,
  passwordHashRounds: 12,
  usernameFormatValidator,
  emailFormatValidator,
  phoneFormatValidator,
  passwordFormatValidator,
  jwtSecret: "REPLACE_ME!",
  jwtTtl: 14 * 86400,
  // 14 days
  jwtHeaderName: "authorization",
  jwtCookieName: "accessToken",
  jwtQueryParam: "accessToken"
};
async function preHandlerHook(ctx) {
  const localizer = authLocalizer.cloneWithLocaleFromRequest(ctx.req);
  ctx.container.set(AuthLocalizer, localizer);
  const authService = ctx.container.get(AuthService);
  const user = await authService.findUserByRequestContext(ctx);
  const userSession = new UserSession(user);
  ctx.container.set(UserSession, userSession);
}
__name(preHandlerHook, "preHandlerHook");
var _AuthService = class _AuthService extends DebuggableService2 {
  /**
   * Options.
   */
  options = JSON.parse(JSON.stringify(DEFAULT_AUTH_OPTIONS));
  /**
   * Constructor.
   *
   * @param container
   * @param options
   */
  constructor(container, options) {
    super(container);
    if (options) {
      const filteredOptions = removeEmptyKeys(options);
      this.options = Object.assign(this.options, filteredOptions);
    }
  }
  /**
   * Register models.
   */
  registerModels(options) {
    const debug = this.getDebuggerFor(this.registerModels);
    debug("Registering models.");
    const dbs = this.getRegisteredService(import_js_repository8.DatabaseSchema);
    const defReg = dbs.getService(import_js_repository9.DefinitionRegistry);
    AUTH_MODEL_LIST.forEach((modelCtor) => {
      if (defReg.hasModel(modelCtor.name)) {
        debug("%s is skipped because it is already registered.", modelCtor.name);
      } else {
        const modelDef = (0, import_js_repository_decorators9.getModelDefinitionFromClass)(modelCtor);
        dbs.defineModel({
          ...modelDef,
          datasource: options == null ? void 0 : options.datasource
        });
        debug("%s is registered.", modelCtor.name);
      }
    });
    debug("Model registration is done.");
  }
  /**
   * Register hooks.
   */
  registerRequestHooks() {
    const debug = this.getDebuggerFor(this.registerRequestHooks);
    debug("Registering hooks.");
    this.getRegisteredService(import_js_trie_router.TrieRouter).addHook("preHandler", preHandlerHook);
    debug("Hooks registration is done.");
  }
  /**
   * Create access token.
   *
   * @param user
   * @param patch
   */
  async createAccessToken(user, patch) {
    const debug = this.getDebuggerFor(this.createAccessToken);
    debug("Creating access token.");
    if (!user.id) {
      throw new Error("User ID is not defined.");
    }
    const data = {
      id: (0, import_uuid.v7)(),
      ownerId: user.id,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      ...patch
    };
    debug("Token ID is %v.", data.id);
    debug("Token owner is %v.", user.id);
    const dbs = this.getRegisteredService(import_js_repository8.DatabaseSchema);
    const rep = dbs.getRepository(AccessTokenModel.name);
    const res = await rep.create(data);
    debug("Access token saved.");
    return res;
  }
  /**
   * Remove access token.
   *
   * @param tokenId
   */
  async removeAccessToken(accessTokenId) {
    const debug = this.getDebuggerFor(this.removeAccessToken);
    debug("Remove access token.");
    debug("Token ID is %v.", accessTokenId);
    const dbs = this.getRegisteredService(import_js_repository8.DatabaseSchema);
    const rep = dbs.getRepository(AccessTokenModel.name);
    const res = await rep.deleteById(accessTokenId);
    if (res) {
      debug("Access token removed.");
    } else {
      debug("Access token does not exist.");
    }
    return res;
  }
  /**
   * Access Token to JSON Web Token.
   *
   * @param accessToken
   */
  accessTokenToJwt(accessToken) {
    const debug = this.getDebuggerFor(this.accessTokenToJwt);
    debug("Converting access token to JWT.");
    const payload = { uid: accessToken.ownerId, tid: accessToken.id };
    const expiresAt = Math.floor(Date.now() / 1e3) + this.options.jwtTtl;
    return new Promise((res, rej) => {
      import_jsonwebtoken.default.sign(payload, this.options.jwtSecret, { algorithm: "HS256", expiresIn: this.options.jwtTtl }, (err, token) => {
        if (err || !token) {
          console.error(err);
          return rej(createError(import_http_errors6.default.InternalServerError, "JWT_ENCODING_FAILED", "Unable to encode JSON web token", payload));
        }
        res({ token, expiresAt });
      });
    });
  }
  /**
   * Verify JWT and find Access Token.
   *
   * @param jwToken
   * @param localizer
   * @param include
   */
  async verifyJwtAndFindItsOwner(jwToken, localizer, include) {
    const debug = this.getDebuggerFor(this.verifyJwtAndFindItsOwner);
    const errorKeyPrefix = "authorizationService.verifyJwtAndFindItsOwner";
    debug("Verifying JWT and find its owner.");
    let error;
    let payload;
    try {
      payload = await new Promise((res, rej) => {
        import_jsonwebtoken.default.verify(jwToken, this.options.jwtSecret, (err, decoded) => {
          if (err)
            return rej(err);
          res(decoded);
        });
      });
    } catch (err) {
      error = err;
    }
    if (error || !payload || typeof payload !== "object" || !("uid" in payload) || !("tid" in payload) || !payload.uid || !payload.tid) {
      console.log(error);
      throw createError(import_http_errors6.default.InternalServerError, "JWT_VERIFYING_FAILED", "Unable to verify JSON web token", payload);
    }
    const dbs = this.getRegisteredService(import_js_repository8.DatabaseSchema);
    const rep = dbs.getRepository(AccessTokenModel.name);
    const accessToken = await rep.findOne({
      where: { id: payload.tid },
      include: include ? { owner: include } : void 0
    });
    if (!accessToken || accessToken.ownerId !== payload.uid)
      throw createError(import_http_errors6.default.InternalServerError, "JWT_VERIFYING_FAILED", "Unable to verify JSON web token", payload);
    debug("Access token has been found.");
    debug("Token ID is %v.", accessToken.id);
    if (!accessToken.ownerId || !accessToken.owner)
      throw createError(import_http_errors6.default.Unauthorized, "ACCESS_TOKEN_OWNER_NOT_FOUND", localizer.t(`${errorKeyPrefix}.ownerNotFound`), { accessTokenId: accessToken.id });
    debug("Token owner is %v.", accessToken.ownerId);
    return accessToken.owner;
  }
  /**
   * Hash password.
   *
   * @param password
   */
  async hashPassword(password) {
    try {
      return import_bcrypt.default.hash(password, this.options.passwordHashRounds);
    } catch (error) {
      console.error(error);
      throw createError(import_http_errors6.default.InternalServerError, "HASH_PASSWORD_FAILED", "Unable to hash the given password");
    }
  }
  /**
   * Verify password.
   *
   * @param password
   * @param hash
   */
  async verifyPassword(password, hash) {
    try {
      return import_bcrypt.default.compare(password, hash);
    } catch (error) {
      console.error(error);
      throw createError(import_http_errors6.default.InternalServerError, "PASSWORD_VERIFYING_ERROR", "Unable to verify the given password");
    }
  }
  /**
   * Find user.
   *
   * @param lookup
   * @param include
   */
  async findUser(lookup, include) {
    if (!lookup.username && !lookup.email && !lookup.phone)
      return;
    const where = {};
    if (lookup.username)
      where.username = lookup.username.toLowerCase();
    if (lookup.email)
      where.email = lookup.email.toLowerCase();
    if (lookup.phone)
      where.phone = lookup.phone.toLowerCase();
    const dbs = this.getRegisteredService(import_js_repository8.DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    const res = await userRep.findOne({ where, include });
    return res;
  }
  /**
   * Is attempting to remove last identifier.
   *
   * @param idName
   * @param data
   * @param updatingUser
   */
  isAttemptingToRemoveLastIdentifier(idName, data, updatingUser) {
    if (data[idName] !== "")
      return false;
    const otherIdentifiers = USER_LOGIN_IDENTIFIERS.filter((id) => id !== idName);
    const isProvidingNewIdentifier = otherIdentifiers.some((id) => data[id]);
    if (isProvidingNewIdentifier)
      return false;
    const hasOtherExistingIdentifiers = otherIdentifiers.some((id) => updatingUser[id]);
    return !hasOtherExistingIdentifiers;
  }
  /**
   * Validate user identifier.
   *
   * @param idName
   * @param data
   * @param localizer
   * @param existingUser
   */
  async validateUserIdentifier(idName, data, localizer, existingUser) {
    const titledIdName = idName.charAt(0).toUpperCase() + idName.slice(1);
    const errorKeyPrefix = "authorizationService.validateUserIdentifier";
    const value = data[idName];
    if (existingUser && value == null)
      return;
    const isRequired = this.options[`require${titledIdName}`];
    if (isRequired && !value)
      throw createError(import_http_errors6.default.BadRequest, "LOGIN_IDENTIFIER_REQUIRED", localizer.t(`${errorKeyPrefix}.${idName}RequiredError`));
    const validator = this.options[`${idName}FormatValidator`];
    validator(value, localizer);
    const duplicate = await this.findUser({ [idName]: value });
    if (duplicate && duplicate.id !== (existingUser == null ? void 0 : existingUser.id)) {
      const errorKey = `${errorKeyPrefix}.duplicate${titledIdName}Error`;
      throw createError(import_http_errors6.default.BadRequest, "DUPLICATE_USER_IDENTIFIER", localizer.t(errorKey));
    }
    if (existingUser && this.isAttemptingToRemoveLastIdentifier(idName, data, existingUser)) {
      throw createError(import_http_errors6.default.BadRequest, "LOGIN_IDENTIFIER_REQUIRED", localizer.t(`${errorKeyPrefix}.${idName}RequiredError`));
    }
  }
  /**
   * Register user.
   *
   * @param ctx
   * @param data
   * @param include
   */
  async createUser(ctx, data, include) {
    data = JSON.parse(JSON.stringify(data));
    const debug = this.getDebuggerFor(this.createUser);
    const localizer = ctx.container.getRegistered(import_js_localizer2.Localizer);
    debug("Creating user.");
    USER_LOGIN_IDENTIFIERS.forEach((loginId) => {
      if (typeof data[loginId] === "string")
        data[loginId] = data[loginId].trim();
    });
    const validationPromises = [];
    USER_LOGIN_IDENTIFIERS.forEach((loginId) => {
      validationPromises.push(this.validateUserIdentifier(loginId, data, localizer));
    });
    await Promise.all(validationPromises);
    if (USER_LOGIN_IDENTIFIERS.every((id) => !data[id]))
      throw createError(import_http_errors6.default.BadRequest, "LOGIN_IDENTIFIER_REQUIRED", localizer.t("authorizationService.createUser.identifierRequiredError"));
    if (this.options.requirePassword || data.password) {
      this.options.passwordFormatValidator(data.password, localizer);
      data.password = await this.hashPassword(data.password || "");
      debug("Password hashed.");
    }
    data.createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const dbs = this.getRegisteredService(import_js_repository8.DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    const res = await userRep.create(data, { include });
    debug("User created %v.", res.id);
    return res;
  }
  /**
   * Update user.
   *
   * @param ctx
   * @param userId
   * @param data
   * @param include
   */
  async updateUser(ctx, userId, data, include) {
    data = JSON.parse(JSON.stringify(data));
    const debug = this.getDebuggerFor(this.updateUser);
    const localizer = ctx.container.getRegistered(import_js_localizer2.Localizer);
    debug("Updating user.");
    debug("User ID is %v.", userId);
    const dbs = this.getRegisteredService(import_js_repository8.DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    const user = await userRep.findById(userId);
    USER_LOGIN_IDENTIFIERS.forEach((loginId) => {
      if (typeof data[loginId] === "string")
        data[loginId] = data[loginId].trim();
    });
    const validationPromises = [];
    USER_LOGIN_IDENTIFIERS.forEach((loginId) => {
      validationPromises.push(this.validateUserIdentifier(loginId, data, localizer, user));
    });
    await Promise.all(validationPromises);
    USER_LOGIN_IDENTIFIERS.forEach((loginId) => {
      if (data[loginId] == null)
        delete data[loginId];
    });
    if (USER_LOGIN_IDENTIFIERS.every((loginId) => data[loginId] === "")) {
      throw createError(import_http_errors6.default.BadRequest, "LOGIN_IDENTIFIER_REQUIRED", localizer.t("authorizationService.updateUser.identifierRequiredError"));
    }
    if (data.password != null) {
      this.options.passwordFormatValidator(data.password, localizer);
      data.password = await this.hashPassword(data.password || "");
      debug("Password hashed.");
    }
    delete data.createdAt;
    data.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    const res = await userRep.patchById(userId, data, { include });
    debug("User updated.");
    return res;
  }
  /**
   * Find user and validate password.
   *
   * @param ctx
   * @param lookup
   * @param include
   */
  async findUserAndValidatePassword(ctx, lookup, include) {
    const debug = this.getDebuggerFor(this.findUserAndValidatePassword);
    const localizer = ctx.container.getRegistered(import_js_localizer2.Localizer);
    const errorKeyPrefix = "authorizationService.findUserAndValidatePassword";
    debug("Finding user and validating password.");
    const debugCtx = JSON.parse(JSON.stringify(lookup));
    delete debugCtx.password;
    debug.inspect("Input:", debugCtx);
    if (!lookup.username && !lookup.email && !lookup.phone) {
      const idFields = USER_LOGIN_IDENTIFIERS.filter((id) => id in lookup);
      const singleIdField = idFields.length === 1 ? idFields[0] : void 0;
      if (singleIdField && lookup[singleIdField] === "")
        throw createError(import_http_errors6.default.BadRequest, "LOGIN_IDENTIFIER_REQUIRED", localizer.t(`${errorKeyPrefix}.${singleIdField}RequiredError`), debugCtx);
      throw createError(import_http_errors6.default.BadRequest, "LOGIN_IDENTIFIER_REQUIRED", localizer.t(`${errorKeyPrefix}.identifierRequiredError`), debugCtx);
    }
    const user = await this.findUser(lookup, include);
    if (!user)
      throw createError(import_http_errors6.default.BadRequest, "USER_NOT_FOUND", localizer.t(`${errorKeyPrefix}.loginFailedError`), debugCtx);
    const isPasswordValid = await this.verifyPassword(lookup.password || "", user.password || "");
    if (!isPasswordValid)
      throw createError(import_http_errors6.default.BadRequest, "INVALID_PASSWORD", localizer.t(`${errorKeyPrefix}.loginFailedError`), debugCtx);
    return user;
  }
  /**
   * Find user by request context.
   *
   * @param ctx
   * @param include
   */
  async findUserByRequestContext(ctx, include) {
    const debug = this.getDebuggerFor(this.findUserByRequestContext);
    const localizer = ctx.container.getRegistered(import_js_localizer2.Localizer);
    debug("Finding user by request context.");
    const jwToken = ctx.headers[this.options.jwtHeaderName] || ctx.cookie[this.options.jwtCookieName] || ctx.query[this.options.jwtQueryParam];
    if (!jwToken) {
      debug("Token does not exist in the request context.");
      return;
    }
    return await this.verifyJwtAndFindItsOwner(jwToken, localizer, include);
  }
  /**
   * Issue JSON Web Token for User.
   *
   * @param user
   * @param patch
   */
  async issueJwtForUser(user, patch) {
    const accessToken = await this.createAccessToken(user, patch);
    return this.accessTokenToJwt(accessToken);
  }
};
__name(_AuthService, "AuthService");
var AuthService = _AuthService;

// dist/esm/decorators/require-role.js
var import_ts_rest_router = require("@e22m4u/ts-rest-router");
function requireRole(roleName) {
  return (0, import_ts_rest_router.beforeAction)(roleGuard(roleName));
}
__name(requireRole, "requireRole");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AccessRule,
  AccessTokenModel,
  AuthLocalizer,
  AuthService,
  BaseAccessTokenModel,
  BaseRoleModel,
  BaseUserModel,
  DEFAULT_AUTH_OPTIONS,
  RoleModel,
  UserModel,
  UserSession,
  authLocalizer,
  requireRole,
  roleGuard
});

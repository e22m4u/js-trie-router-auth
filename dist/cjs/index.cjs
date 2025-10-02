"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// dist/esm/index.js
var index_exports = {};
__export(index_exports, {
  AccessRule: () => AccessRule,
  AccessTokenModel: () => AccessTokenModel,
  AuthLocalizer: () => AuthLocalizer,
  AuthService: () => AuthService,
  AuthSession: () => AuthSession,
  BaseAccessTokenModel: () => BaseAccessTokenModel,
  BaseRoleModel: () => BaseRoleModel,
  BaseUserModel: () => BaseUserModel,
  DEFAULT_AUTH_OPTIONS: () => DEFAULT_AUTH_OPTIONS,
  LOGIN_ID_NAMES: () => LOGIN_ID_NAMES,
  LOWER_CASE_LOGIN_ID_NAMES: () => LOWER_CASE_LOGIN_ID_NAMES,
  RoleModel: () => RoleModel,
  UserModel: () => UserModel,
  authLocalizer: () => authLocalizer,
  requireRole: () => requireRole,
  roleGuard: () => roleGuard
});
module.exports = __toCommonJS(index_exports);

// dist/esm/hooks/role-guard.js
var import_http_errors7 = __toESM(require("http-errors"), 1);

// dist/esm/utils/create-error.js
var import_js_format = require("@e22m4u/js-format");
function createError(ctor, code, message, details, ...args) {
  const msg = (0, import_js_format.format)(message, ...args);
  const error = new ctor(msg);
  Object.assign(error, { code, details });
  return error;
}
__name(createError, "createError");

// dist/esm/utils/remove-empty-keys.js
function removeEmptyKeys(plainObject, removeWhen = (v) => v == null) {
  return Object.fromEntries(Object.entries(plainObject).filter(([, value]) => !removeWhen(value)));
}
__name(removeEmptyKeys, "removeEmptyKeys");

// dist/esm/auth-session.js
var import_http_errors6 = __toESM(require("http-errors"), 1);

// dist/esm/auth-service.js
var import_bcrypt = __toESM(require("bcrypt"), 1);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var import_uuid = require("uuid");
var import_http_errors5 = __toESM(require("http-errors"), 1);

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
var _a2;
var RoleModel = (_a2 = class extends BaseRoleModel {
}, __name(_a2, "RoleModel"), _a2);
RoleModel = __decorate([
  (0, import_js_repository_decorators.model)()
], RoleModel);

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
var _a3;
var BaseUserModel = (_a3 = class {
  id;
  username;
  email;
  phone;
  password;
  createdAt;
  updatedAt;
  roleIds;
  roles;
}, __name(_a3, "BaseUserModel"), _a3);
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
var _a4;
var UserModel = (_a4 = class extends BaseUserModel {
}, __name(_a4, "UserModel"), _a4);
UserModel = __decorate2([
  (0, import_js_repository_decorators3.model)()
], UserModel);

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
var _a5;
var BaseAccessTokenModel = (_a5 = class {
  id;
  userAgent;
  createdAt;
  ownerId;
  owner;
}, __name(_a5, "BaseAccessTokenModel"), _a5);
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
var _a6;
var AccessTokenModel = (_a6 = class extends BaseAccessTokenModel {
}, __name(_a6, "AccessTokenModel"), _a6);
AccessTokenModel = __decorate3([
  (0, import_js_repository_decorators6.model)()
], AccessTokenModel);

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
  "authService.validateLoginIdInUserDataInput.duplicateUsernameError": "This username is already taken",
  "authService.validateLoginIdInUserDataInput.duplicateEmailError": "This email address is already in use",
  "authService.validateLoginIdInUserDataInput.duplicatePhoneError": "This phone number is already in use",
  "authService.requireAnyLoginIdentifier.identifierRequiredError": "A username, email address or phone number is required",
  "authService.requireAnyLoginIdentifier.usernameRequiredError": "Please enter username",
  "authService.requireAnyLoginIdentifier.emailRequiredError": "Please enter email",
  "authService.requireAnyLoginIdentifier.phoneRequiredError": "Please enter phone",
  "authService.updateUser.identifierRequiredError": "Please provide a username, email address or phone number",
  "authService.updateUser.userNotFoundError": "User not found",
  "authService.findUserByLoginIds.loginFailedError": "Invalid login or password",
  "authService.verifyPassword.invalidPasswordError": "Invalid login or password",
  "roleGuard.authenticationRequired": "Authentication is required",
  "roleGuard.roleNotAllowed": "You do not have permissions to perform this action",
  "authSession.getUser.authenticationRequired": "Authentication is required",
  "authSession.getAccessTokenId.authenticationRequired": "Authentication is required"
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
  "authService.validateLoginIdInUserDataInput.duplicateUsernameError": "\u042D\u0442\u043E \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0443\u0436\u0435 \u0437\u0430\u043D\u044F\u0442\u043E",
  "authService.validateLoginIdInUserDataInput.duplicateEmailError": "\u042D\u0442\u043E\u0442 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B \u0443\u0436\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F",
  "authService.validateLoginIdInUserDataInput.duplicatePhoneError": "\u042D\u0442\u043E\u0442 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430 \u0443\u0436\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F",
  "authService.requireAnyLoginIdentifier.identifierRequiredError": "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F, \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
  "authService.requireAnyLoginIdentifier.usernameRequiredError": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",
  "authService.requireAnyLoginIdentifier.emailRequiredError": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B",
  "authService.requireAnyLoginIdentifier.phoneRequiredError": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
  "authService.updateUser.identifierRequiredError": "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F, \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
  "authService.updateUser.userNotFoundError": "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D",
  "authService.findUserByLoginIds.loginFailedError": "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C",
  "authService.verifyPassword.invalidPasswordError": "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C",
  "roleGuard.authenticationRequired": "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F",
  "roleGuard.roleNotAllowed": "\u0423 \u0432\u0430\u0441 \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043F\u0440\u0430\u0432 \u0434\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
  "authSession.getUser.authenticationRequired": "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F",
  "authSession.getAccessTokenId.authenticationRequired": "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F"
};

// dist/esm/auth-localizer.js
var _AuthLocalizer = class _AuthLocalizer extends import_js_localizer.Localizer {
};
__name(_AuthLocalizer, "AuthLocalizer");
var AuthLocalizer = _AuthLocalizer;
var authLocalizer = new AuthLocalizer({
  dictionaries: { en: en_default, ru: ru_default }
});

// dist/esm/auth-service.js
var import_js_trie_router = require("@e22m4u/js-trie-router");
var import_js_repository8 = require("@e22m4u/js-repository");
var import_js_repository9 = require("@e22m4u/js-repository");

// dist/esm/debuggable-service.js
var import_js_service = require("@e22m4u/js-service");
var _DebuggableService = class _DebuggableService extends import_js_service.DebuggableService {
  /**
   * Constructor.
   *
   * @param container
   */
  constructor(container) {
    super(container, {
      namespace: "jsTrieRouterAuth",
      noEnvironmentNamespace: true
    });
  }
};
__name(_DebuggableService, "DebuggableService");
var DebuggableService = _DebuggableService;

// dist/esm/validators/email-format-validator.js
var import_http_errors = __toESM(require("http-errors"), 1);
var EMAIL_FORMAT_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var emailFormatValidator = /* @__PURE__ */ __name(function(value, localizer) {
  if (!value || typeof value !== "string" || !EMAIL_FORMAT_REGEX.test(value))
    throw createError(import_http_errors.default.BadRequest, "INVALID_EMAIL_FORMAT", localizer.t("validators.dataFormatValidator.invalidEmailFormatError"), { email: value });
}, "emailFormatValidator");

// dist/esm/validators/phone-format-validator.js
var import_http_errors2 = __toESM(require("http-errors"), 1);
var PHONE_FORMAT_REGEX = /^[+]?[0-9]{0,3}\W*[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
var phoneFormatValidator = /* @__PURE__ */ __name(function(value, localizer) {
  if (!value || typeof value !== "string" || !PHONE_FORMAT_REGEX.test(value))
    throw createError(import_http_errors2.default.BadRequest, "INVALID_PHONE_FORMAT", localizer.t("validators.dataFormatValidator.invalidPhoneFormatError"), { phone: value });
}, "phoneFormatValidator");

// dist/esm/validators/username-format-validator.js
var import_http_errors3 = __toESM(require("http-errors"), 1);
var MIN_USERNAME_LENGTH = 4;
var MAX_USERNAME_LENGTH = 30;
var usernameFormatValidator = /* @__PURE__ */ __name(function(value, localizer) {
  if (typeof value !== "string")
    throw createError(import_http_errors3.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("validators.dataFormatValidator.invalidUsernameFormatError"), { username: value });
  if (value.length < MIN_USERNAME_LENGTH)
    throw createError(import_http_errors3.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("validators.dataFormatValidator.minUsernameLengthError"), { username: value }, MIN_USERNAME_LENGTH);
  if (value.length > MAX_USERNAME_LENGTH)
    throw createError(import_http_errors3.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("validators.dataFormatValidator.maxUsernameLengthError"), { username: value }, MAX_USERNAME_LENGTH);
  if (!/^[a-zA-Z]/.test(value))
    throw createError(import_http_errors3.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("validators.dataFormatValidator.usernameStartLetterError"), { username: value });
  if (!/^[a-zA-Z0-9]+$/.test(value))
    throw createError(import_http_errors3.default.BadRequest, "INVALID_USERNAME_FORMAT", localizer.t("validators.dataFormatValidator.invalidUsernameFormatError"), { username: value });
}, "usernameFormatValidator");

// dist/esm/validators/password-format-validator.js
var import_http_errors4 = __toESM(require("http-errors"), 1);
var MIN_PASSWORD_LENGTH = 8;
var MAX_PASSWORD_LENGTH = 80;
var passwordFormatValidator = /* @__PURE__ */ __name(function(value, localizer) {
  if (typeof value !== "string")
    throw createError(import_http_errors4.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("validators.dataFormatValidator.invalidPasswordFormatError"), { password: value });
  if (value.length < MIN_PASSWORD_LENGTH)
    throw createError(import_http_errors4.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("validators.dataFormatValidator.minPasswordLengthError"), { password: value }, MIN_PASSWORD_LENGTH);
  if (value.length > MAX_PASSWORD_LENGTH)
    throw createError(import_http_errors4.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("validators.dataFormatValidator.maxPasswordLengthError"), { password: value }, MAX_PASSWORD_LENGTH);
  if (!new RegExp("\\p{L}", "u").test(value) || !new RegExp("\\p{N}", "u").test(value))
    throw createError(import_http_errors4.default.BadRequest, "INVALID_PASSWORD_FORMAT", localizer.t("validators.dataFormatValidator.invalidPasswordFormatError"), { password: value });
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
var LOGIN_ID_NAMES = ["username", "email", "phone"];
var LOWER_CASE_LOGIN_ID_NAMES = [
  "username",
  "email",
  "phone"
];
var DEFAULT_AUTH_OPTIONS = {
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
  jwtQueryParam: "accessToken",
  sessionUserInclusion: "roles"
};
async function preHandlerHook(ctx) {
  const localizer = authLocalizer.cloneWithLocaleFromRequest(ctx.req);
  ctx.container.set(AuthLocalizer, localizer);
  const rootAuthService = ctx.container.getRegistered(AuthService);
  const authService = rootAuthService.cloneWithRequestContext(ctx);
  ctx.container.set(AuthService, authService);
  const authSession = await authService.createAuthSession(ctx);
  ctx.container.set(AuthSession, authSession);
}
__name(preHandlerHook, "preHandlerHook");
var _AuthService = class _AuthService extends DebuggableService {
  requestContext;
  /**
   * Options.
   */
  options = Object.assign({}, DEFAULT_AUTH_OPTIONS);
  /**
   * Constructor.
   *
   * @param container
   * @param options
   */
  constructor(container, options, requestContext) {
    super(container);
    this.requestContext = requestContext;
    if (options) {
      const filteredOptions = removeEmptyKeys(options);
      this.options = Object.assign(this.options, filteredOptions);
    }
    if (process.env.NODE_ENV === "production" && this.options.jwtSecret === "REPLACE_ME!") {
      throw new Error("JWT secret is not set for the production environment!");
    }
  }
  /**
   * Get localizer
   */
  getLocalizer() {
    if (!this.requestContext || !this.requestContext.container.has(AuthLocalizer)) {
      return authLocalizer;
    }
    return this.requestContext.container.getRegistered(AuthLocalizer);
  }
  /**
   * Clone with request context.
   *
   * @param ctx
   */
  cloneWithRequestContext(ctx) {
    return new _AuthService(this.container, this.options, ctx);
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
        debug("%s skipped, already registered.", modelCtor.name);
      } else {
        const modelDef = (0, import_js_repository_decorators9.getModelDefinitionFromClass)(modelCtor);
        dbs.defineModel({
          ...modelDef,
          datasource: options == null ? void 0 : options.datasource
        });
        debug("%s registered.", modelCtor.name);
      }
    });
    debug("Models registered.");
  }
  /**
   * Register hooks.
   */
  registerRequestHooks() {
    const debug = this.getDebuggerFor(this.registerRequestHooks);
    debug("Registering request hooks.");
    this.getRegisteredService(import_js_trie_router.TrieRouter).addHook("preHandler", preHandlerHook);
    debug("Hooks registered.");
  }
  /**
   * Create access token.
   *
   * @param user
   */
  async createAccessToken(ownerId, patch) {
    const debug = this.getDebuggerFor(this.createAccessToken);
    debug("Creating access token.");
    debug("Owner id was %v.", ownerId);
    const data = {
      id: (0, import_uuid.v7)(),
      ownerId,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      ...patch
    };
    const dbs = this.getRegisteredService(import_js_repository8.DatabaseSchema);
    const rep = dbs.getRepository(AccessTokenModel.name);
    const res = await rep.create(data);
    debug("Access token created and saved to database.");
    return res;
  }
  /**
   * Remove access token by id.
   *
   * @param tokenId
   */
  async removeAccessTokenById(accessTokenId) {
    const debug = this.getDebuggerFor(this.removeAccessTokenById);
    debug("Removing access token by id.");
    debug("Token id was %v.", accessTokenId);
    const dbs = this.getRegisteredService(import_js_repository8.DatabaseSchema);
    const rep = dbs.getRepository(AccessTokenModel.name);
    const res = await rep.deleteById(accessTokenId);
    if (res) {
      debug("Access token removed from database.");
    } else {
      debug("Access token not found.");
    }
    return res;
  }
  /**
   * Issue JSON Web Token.
   *
   * @param accessToken
   */
  issueJwt(accessToken) {
    const debug = this.getDebuggerFor(this.issueJwt);
    debug("Issuing JWT.");
    debug("Token id was %v.", accessToken.id);
    debug("Owner id was %v.", accessToken.ownerId);
    const payload = { uid: accessToken.ownerId, tid: accessToken.id };
    const expiresAtInSec = Math.floor(Date.now() / 1e3) + this.options.jwtTtl;
    const expiresAt = new Date(expiresAtInSec * 1e3).toISOString();
    debug("Expiration date was %v.", expiresAt);
    return new Promise((res, rej) => {
      import_jsonwebtoken.default.sign(payload, this.options.jwtSecret, { algorithm: "HS256", expiresIn: this.options.jwtTtl }, (err, token) => {
        if (err || !token) {
          console.error(err);
          return rej(createError(import_http_errors5.default.InternalServerError, "TOKEN_ENCODING_FAILED", "Unable to encode JSON web token", payload));
        }
        debug("Token was %v.", token);
        debug("Token created.");
        res({ token, expiresAt });
      });
    });
  }
  /**
   * Decode Jwt.
   *
   * @param jwToken
   */
  async decodeJwt(jwToken) {
    const debug = this.getDebuggerFor(this.decodeJwt);
    debug("Decoding JWT.");
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
      console.error(error);
      throw createError(import_http_errors5.default.InternalServerError, "TOKEN_VERIFYING_FAILED", "Unable to verify JSON web token", { token: jwToken, payload });
    }
    debug.inspect("Payload:", payload);
    debug("Token decoded successfully.");
    return payload;
  }
  /**
   * Find access token by id.
   *
   * @param jwToken
   * @param include
   */
  async findAccessTokenById(tokenId, include) {
    const debug = this.getDebuggerFor(this.findAccessTokenById);
    debug("Finding access token by id.");
    debug("Token id was %v.", tokenId);
    const dbs = this.getRegisteredService(import_js_repository8.DatabaseSchema);
    const rep = dbs.getRepository(AccessTokenModel.name);
    const accessToken = await rep.findOne({ where: { id: tokenId }, include });
    if (!accessToken)
      throw createError(import_http_errors5.default.InternalServerError, "ACCESS_TOKEN_NOT_FOUND", "Access token is not found in the database", { tokenId });
    debug("Owner id was %v.", accessToken.ownerId);
    if (!accessToken.ownerId)
      throw createError(import_http_errors5.default.Unauthorized, "ACCESS_TOKEN_OWNER_NOT_FOUND", "Access token has no owner", { tokenId });
    debug("Access token found.");
    return accessToken;
  }
  /**
   * Hash password.
   *
   * @param password
   */
  async hashPassword(password) {
    if (!password)
      return "";
    try {
      return import_bcrypt.default.hash(password, this.options.passwordHashRounds);
    } catch (error) {
      console.error(error);
      throw createError(import_http_errors5.default.InternalServerError, "PASSWORD_HASHING_ERROR", "Unable to hash the given password");
    }
  }
  /**
   * Verify password.
   *
   * @param password
   * @param hash
   * @param silent
   */
  async verifyPassword(password, hash, silent = false) {
    const debug = this.getDebuggerFor(this.verifyPassword);
    const localizer = this.getLocalizer();
    const errorKeyPrefix = "authService.verifyPassword";
    debug("Verifying password");
    let isValid = false;
    try {
      isValid = await import_bcrypt.default.compare(password, hash);
    } catch (error) {
      console.error(error);
      throw createError(import_http_errors5.default.InternalServerError, "PASSWORD_VERIFYING_ERROR", "Unable to verify the given password");
    }
    if (!isValid) {
      if (silent)
        return false;
      throw createError(import_http_errors5.default.BadRequest, "PASSWORD_VERIFYING_ERROR", localizer.t(`${errorKeyPrefix}.invalidPasswordError`));
    }
    debug("Password verified.");
    return true;
  }
  /**
   * Find user by login ids.
   *
   * @param lookup
   * @param include
   * @param silent
   */
  async findUserByLoginIds(inputData, include, silent = false) {
    const debug = this.getDebuggerFor(this.findUserByLoginIds);
    debug("Finding user by login identifiers.");
    const localizer = this.getLocalizer();
    const errorKeyPrefix = "authService.findUserByLoginIds";
    const where = {};
    let hasAnyLoginId = false;
    LOGIN_ID_NAMES.forEach((name) => {
      if (inputData[name] && String(inputData[name]).trim()) {
        debug("Given %s was %v.", name, inputData[name]);
        hasAnyLoginId = true;
        const idValue = LOWER_CASE_LOGIN_ID_NAMES.includes(name) ? String(inputData[name]).trim().toLowerCase() : String(inputData[name]).trim();
        where[name] = idValue;
      }
    });
    if (!hasAnyLoginId) {
      if (silent)
        return;
      this.requireAnyLoginId(inputData);
    }
    const dbs = this.getRegisteredService(import_js_repository8.DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    const user = await userRep.findOne({ where, include });
    if (!user) {
      debug("User not found.");
      if (silent)
        return;
      throw createError(import_http_errors5.default.BadRequest, "USER_NOT_FOUND", localizer.t(`${errorKeyPrefix}.loginFailedError`));
    }
    debug("User found with id %v.", user.id);
    return user;
  }
  /**
   * Validate login id.
   *
   * @param idName
   * @param idValue
   * @param ownerId
   */
  async validateLoginId(idName, idValue, ownerId) {
    const debug = this.getDebuggerFor(this.validateLoginId);
    debug("Validating login identifier in the user data input.");
    const localizer = this.getLocalizer();
    const titledIdName = idName.charAt(0).toUpperCase() + idName.slice(1);
    const errorKeyPrefix = "authService.validateLoginId";
    debug("Given id name was %v.", idName);
    debug("Given id value was %v.", idValue);
    if (idValue) {
      const validator = this.options[`${idName}FormatValidator`];
      validator(idValue, localizer);
      debug("Value format validated.");
      debug("Checking identifier duplicates.");
      const duplicate = await this.findUserByLoginIds({ [idName]: idValue }, void 0, true);
      if (duplicate && duplicate.id !== ownerId) {
        const errorKey = `${errorKeyPrefix}.duplicate${titledIdName}Error`;
        throw createError(import_http_errors5.default.BadRequest, "DUPLICATE_LOGIN_IDENTIFIER", localizer.t(errorKey));
      }
      debug("No duplicates found.");
    }
    debug("Identifier validated.");
  }
  /**
   * Require any login id.
   *
   * @param inputData
   */
  async requireAnyLoginId(data) {
    const debug = this.getDebuggerFor(this.createUser);
    debug("Require any login identifier.");
    const localizer = this.getLocalizer();
    const errorKeyPrefix = "authService.requireAnyLoginId";
    if (LOGIN_ID_NAMES.every((idName) => !data[idName])) {
      debug("No login identifier was given.");
      const idFields = LOGIN_ID_NAMES.filter((id) => id in data);
      const singleIdField = idFields.length === 1 ? idFields[0] : void 0;
      if (singleIdField && data[singleIdField] === "")
        throw createError(import_http_errors5.default.BadRequest, singleIdField.toUpperCase() + "_REQUIRED", localizer.t(`${errorKeyPrefix}.${singleIdField}RequiredError`));
      throw createError(import_http_errors5.default.BadRequest, "LOGIN_IDENTIFIER_REQUIRED", localizer.t(`${errorKeyPrefix}.identifierRequiredError`));
    }
  }
  /**
   * Create user.
   *
   * @param ctx
   * @param data
   * @param include
   */
  async createUser(inputData, include) {
    const debug = this.getDebuggerFor(this.createUser);
    debug("Creating user.");
    const localizer = this.getLocalizer();
    inputData = JSON.parse(JSON.stringify(inputData));
    LOGIN_ID_NAMES.forEach((idName) => {
      if (typeof inputData[idName] === "string")
        inputData[idName] = inputData[idName].trim();
    });
    for (const idName of LOGIN_ID_NAMES) {
      await this.validateLoginId(idName, inputData[idName]);
    }
    if (inputData.password) {
      this.options.passwordFormatValidator(inputData.password, localizer);
      inputData.password = await this.hashPassword(inputData.password || "");
      debug("Password hashed.");
    }
    inputData.createdAt = (/* @__PURE__ */ new Date()).toISOString();
    const dbs = this.getRegisteredService(import_js_repository8.DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    const res = await userRep.create(inputData, { include });
    debug("User created.");
    debug("User id was %v.", res.id);
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
  async updateUser(userId, inputData, include) {
    const debug = this.getDebuggerFor(this.updateUser);
    debug("Updating user.");
    debug("User id was %v.", userId);
    inputData = JSON.parse(JSON.stringify(inputData));
    const localizer = this.getLocalizer();
    const errorKeyPrefix = "authService.updateUser";
    const dbs = this.getRegisteredService(import_js_repository8.DatabaseSchema);
    const userRep = dbs.getRepository(UserModel.name);
    const existingUser = await userRep.findOne({ where: { id: userId } });
    if (!existingUser)
      throw createError(import_http_errors5.default.BadRequest, "USER_NOT_FOUND", localizer.t(`${errorKeyPrefix}.userNotFoundError`));
    LOGIN_ID_NAMES.forEach((idName) => {
      if (typeof inputData[idName] === "string")
        inputData[idName] = inputData[idName].trim();
    });
    for (const idName of LOGIN_ID_NAMES) {
      await this.validateLoginId(idName, inputData[idName], existingUser.id);
    }
    LOGIN_ID_NAMES.forEach((idName) => {
      if (inputData[idName] == null)
        delete inputData[idName];
    });
    if (inputData.password) {
      this.options.passwordFormatValidator(inputData.password, localizer);
      inputData.password = await this.hashPassword(inputData.password || "");
      debug("Password hashed.");
    }
    delete inputData.createdAt;
    inputData.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    const res = await userRep.patchById(userId, inputData, { include });
    debug("User updated.");
    return res;
  }
  /**
   * Find access token by request context.
   *
   * @param ctx
   * @param include
   */
  async findAccessTokenByRequestContext(ctx, include) {
    const debug = this.getDebuggerFor(this.findAccessTokenByRequestContext);
    debug("Finding access token by request context.");
    const jwToken = ctx.headers[this.options.jwtHeaderName] || ctx.cookies[this.options.jwtCookieName] || ctx.query[this.options.jwtQueryParam];
    if (!jwToken) {
      debug("JWT not found.");
      return;
    }
    const payload = await this.decodeJwt(jwToken);
    const accessToken = await this.findAccessTokenById(payload.tid, include);
    if (accessToken.ownerId !== payload.uid)
      throw createError(import_http_errors5.default.BadRequest, "INVALID_ACCESS_TOKEN_OWNER", "Your access token not match its owner", payload);
    debug("Access token found.");
    debug("Token id was %v.", accessToken.id);
    debug("Owner id was %v.", accessToken.ownerId);
    return accessToken;
  }
  /**
   * Find access token owner.
   *
   * @param accessToken
   */
  async findAccessTokenOwner(accessToken, include) {
    const debug = this.getDebuggerFor(this.findAccessTokenOwner);
    debug("Finding access token owner.");
    if (!accessToken.ownerId)
      throw createError(import_http_errors5.default.BadRequest, "NO_ACCESS_TOKEN_OWNER", "Your access token does not have an owner", accessToken);
    const dbs = this.getRegisteredService(import_js_repository8.DatabaseSchema);
    const rep = dbs.getRepository(UserModel.name);
    const owner = await rep.findOne({
      where: { id: accessToken.ownerId },
      include
    });
    if (!owner)
      throw createError(import_http_errors5.default.BadRequest, "NO_ACCESS_TOKEN_OWNER", "Your access token does not have an owner", accessToken);
    debug("Owner found with id %v.", owner.id);
    return owner;
  }
  /**
   * Create auth session.
   *
   * @param ctx
   */
  async createAuthSession(ctx) {
    const accessToken = await this.findAccessTokenByRequestContext(ctx);
    if (accessToken) {
      const user = await this.findAccessTokenOwner(accessToken, this.options.sessionUserInclusion);
      return new AuthSession(ctx.container, accessToken, user);
    } else {
      return new AuthSession(ctx.container);
    }
  }
};
__name(_AuthService, "AuthService");
var AuthService = _AuthService;

// dist/esm/auth-session.js
var _AuthSession = class _AuthSession extends DebuggableService {
  /**
   * Access token.
   */
  accessToken;
  /**
   * User.
   */
  user;
  /**
   * Is logged in.
   */
  get isLoggedIn() {
    return Boolean(this.accessToken) && Boolean(this.user);
  }
  /**
   * Get localizer.
   */
  getLocalizer() {
    return this.getService(AuthService).getLocalizer();
  }
  /**
   * Constructor.
   *
   * @param user
   */
  constructor(container, accessToken, user) {
    super(container);
    this.accessToken = accessToken;
    this.user = user;
  }
  /**
   * Get user.
   */
  getUser() {
    if (!this.user) {
      const localizer = this.getLocalizer();
      throw createError(import_http_errors6.default.Unauthorized, "AUTHENTICATION_REQUIRED", localizer.t("authSession.getUser.authenticationRequired"));
    }
    return this.user;
  }
  /**
   * User id.
   */
  getUserId() {
    return this.getUser().id;
  }
  /**
   * Get user roles.
   */
  getUserRoles() {
    return this.getUser().roles || [];
  }
  /**
   * Get role names.
   */
  getRoleNames() {
    return this.getUserRoles().map((v) => v.name).filter((v) => typeof v === "string");
  }
  /**
   * Get access token.
   */
  getAccessToken() {
    if (!this.accessToken) {
      const localizer = this.getLocalizer();
      throw createError(import_http_errors6.default.Unauthorized, "AUTHENTICATION_REQUIRED", localizer.t("authSession.getAccessTokenId.authenticationRequired"));
    }
    return this.accessToken;
  }
  /**
   * Access token id.
   */
  getAccessTokenId() {
    return this.getAccessToken().id;
  }
};
__name(_AuthSession, "AuthSession");
var AuthSession = _AuthSession;

// dist/esm/hooks/role-guard.js
var AccessRule = {
  AUTHENTICATED: "$authenticated"
};
function roleGuard(roleName) {
  return function(ctx) {
    const localizer = ctx.container.getRegistered(AuthLocalizer);
    const session = ctx.container.getRegistered(AuthSession);
    if (!session.isLoggedIn)
      throw createError(import_http_errors7.default.Unauthorized, "AUTHORIZATION_REQUIRED", localizer.t("roleGuard.authenticationRequired"));
    const roleNames = [roleName].flat().filter(Boolean);
    if (!roleNames.length || roleNames.includes(AccessRule.AUTHENTICATED)) {
      return;
    }
    const userRoles = session.getRoleNames();
    const isAllowed = userRoles.some((v) => roleNames.includes(v));
    if (!isAllowed)
      throw createError(import_http_errors7.default.Forbidden, "ROLE_NOT_ALLOWED", localizer.t("roleGuard.roleNotAllowed"));
  };
}
__name(roleGuard, "roleGuard");

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
  AuthSession,
  BaseAccessTokenModel,
  BaseRoleModel,
  BaseUserModel,
  DEFAULT_AUTH_OPTIONS,
  LOGIN_ID_NAMES,
  LOWER_CASE_LOGIN_ID_NAMES,
  RoleModel,
  UserModel,
  authLocalizer,
  requireRole,
  roleGuard
});

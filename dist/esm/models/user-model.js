var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { RoleModel } from './role-model.js';
import { noInput } from '@e22m4u/ts-projection';
import { DataType } from '@e22m4u/js-repository';
import { noOutput } from '@e22m4u/ts-projection';
import { RelationType } from '@e22m4u/js-repository';
import { model } from '@e22m4u/js-repository-decorators';
import { PropertyUniqueness } from '@e22m4u/js-repository';
import { property } from '@e22m4u/js-repository-decorators';
import { relation } from '@e22m4u/js-repository-decorators';
/**
 * Base user model.
 */
let BaseUserModel = class BaseUserModel {
    id;
    username;
    email;
    phone;
    password;
    createdAt;
    updatedAt;
    roleIds;
    roles;
};
__decorate([
    property({
        type: DataType.ANY,
        primaryKey: true,
    }),
    __metadata("design:type", Object)
], BaseUserModel.prototype, "id", void 0);
__decorate([
    property({
        type: DataType.STRING,
        unique: PropertyUniqueness.SPARSE,
        default: '',
    }),
    __metadata("design:type", String)
], BaseUserModel.prototype, "username", void 0);
__decorate([
    property({
        type: DataType.STRING,
        unique: PropertyUniqueness.SPARSE,
        default: '',
    }),
    __metadata("design:type", String)
], BaseUserModel.prototype, "email", void 0);
__decorate([
    property({
        type: DataType.STRING,
        unique: PropertyUniqueness.SPARSE,
        default: '',
    }),
    __metadata("design:type", String)
], BaseUserModel.prototype, "phone", void 0);
__decorate([
    property({
        type: DataType.STRING,
        default: '',
    }),
    noOutput(),
    __metadata("design:type", String)
], BaseUserModel.prototype, "password", void 0);
__decorate([
    property({
        type: DataType.STRING,
        default: () => new Date().toISOString(),
    }),
    noInput(),
    __metadata("design:type", String)
], BaseUserModel.prototype, "createdAt", void 0);
__decorate([
    property({
        type: DataType.STRING,
        default: () => new Date().toISOString(),
    }),
    __metadata("design:type", String)
], BaseUserModel.prototype, "updatedAt", void 0);
__decorate([
    property({
        type: DataType.ARRAY,
        itemType: DataType.ANY,
        default: () => [],
    }),
    __metadata("design:type", Array)
], BaseUserModel.prototype, "roleIds", void 0);
__decorate([
    relation({
        type: RelationType.REFERENCES_MANY,
        model: RoleModel.name,
        foreignKey: 'roleIds',
    }),
    __metadata("design:type", Array)
], BaseUserModel.prototype, "roles", void 0);
BaseUserModel = __decorate([
    model()
], BaseUserModel);
export { BaseUserModel };
/**
 * User model.
 */
let UserModel = class UserModel extends BaseUserModel {
};
UserModel = __decorate([
    model()
], UserModel);
export { UserModel };

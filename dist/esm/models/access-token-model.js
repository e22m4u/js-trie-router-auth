var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { UserModel } from './user-model.js';
import { DataType } from '@e22m4u/js-repository';
import { RelationType } from '@e22m4u/js-repository';
import { model } from '@e22m4u/js-repository-decorators';
import { property } from '@e22m4u/js-repository-decorators';
import { relation } from '@e22m4u/js-repository-decorators';
/**
 * Base access token model.
 */
let BaseAccessTokenModel = class BaseAccessTokenModel {
    id;
    userAgent;
    createdAt;
    ownerId;
    owner;
};
__decorate([
    property({
        type: DataType.ANY,
        primaryKey: true,
    }),
    __metadata("design:type", Object)
], BaseAccessTokenModel.prototype, "id", void 0);
__decorate([
    property({
        type: DataType.STRING,
        default: '',
    }),
    __metadata("design:type", String)
], BaseAccessTokenModel.prototype, "userAgent", void 0);
__decorate([
    property({
        type: DataType.STRING,
        default: () => new Date().toISOString(),
    }),
    __metadata("design:type", String)
], BaseAccessTokenModel.prototype, "createdAt", void 0);
__decorate([
    property({
        type: DataType.ANY,
        required: true,
    }),
    __metadata("design:type", Object)
], BaseAccessTokenModel.prototype, "ownerId", void 0);
__decorate([
    relation({
        type: RelationType.BELONGS_TO,
        model: UserModel.name,
        foreignKey: 'ownerId',
    }),
    __metadata("design:type", Object)
], BaseAccessTokenModel.prototype, "owner", void 0);
BaseAccessTokenModel = __decorate([
    model()
], BaseAccessTokenModel);
export { BaseAccessTokenModel };
/**
 * Access token model.
 */
export class AccessTokenModel extends BaseAccessTokenModel {
}

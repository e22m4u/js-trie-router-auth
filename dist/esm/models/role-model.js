var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DataType } from '@e22m4u/js-repository';
import { model } from '@e22m4u/js-repository-decorators';
import { PropertyUniqueness } from '@e22m4u/js-repository';
import { property } from '@e22m4u/js-repository-decorators';
/**
 * Base role model.
 */
let BaseRoleModel = class BaseRoleModel {
    id;
    name;
    createdAt;
};
__decorate([
    property({
        type: DataType.ANY,
        primaryKey: true,
    }),
    __metadata("design:type", Object)
], BaseRoleModel.prototype, "id", void 0);
__decorate([
    property({
        type: DataType.STRING,
        required: true,
        unique: PropertyUniqueness.STRICT,
    }),
    __metadata("design:type", String)
], BaseRoleModel.prototype, "name", void 0);
__decorate([
    property({
        type: DataType.STRING,
        default: () => new Date().toISOString(),
    }),
    __metadata("design:type", String)
], BaseRoleModel.prototype, "createdAt", void 0);
BaseRoleModel = __decorate([
    model()
], BaseRoleModel);
export { BaseRoleModel };
/**
 * Role model.
 */
let RoleModel = class RoleModel extends BaseRoleModel {
};
RoleModel = __decorate([
    model()
], RoleModel);
export { RoleModel };

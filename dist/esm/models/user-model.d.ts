import { BaseRoleModel } from './role-model.js';
/**
 * Base user model.
 */
export declare class BaseUserModel<IdType = number | string, RoleType extends BaseRoleModel = BaseRoleModel> {
    id: IdType;
    username?: string;
    email?: string;
    phone?: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
    roleIds?: RoleType['id'][];
    roles?: RoleType[];
}
/**
 * User model.
 */
export declare class UserModel<IdType = number | string, RoleModel extends BaseRoleModel = BaseRoleModel> extends BaseUserModel<IdType, RoleModel> {
}

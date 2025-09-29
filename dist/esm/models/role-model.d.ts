/**
 * Base role model.
 */
export declare class BaseRoleModel<IdType = number | string> {
    id: IdType;
    name?: string;
    createdAt?: string;
}
/**
 * Role model.
 */
export declare class RoleModel<IdType = number | string> extends BaseRoleModel<IdType> {
}

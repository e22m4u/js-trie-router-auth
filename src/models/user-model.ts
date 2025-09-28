import {RoleModel} from './role-model.js';
import {BaseRoleModel} from './role-model.js';
import {DataType} from '@e22m4u/js-repository';
import {RelationType} from '@e22m4u/js-repository';
import {model} from '@e22m4u/js-repository-decorators';
import {PropertyUniqueness} from '@e22m4u/js-repository';
import {property} from '@e22m4u/js-repository-decorators';
import {relation} from '@e22m4u/js-repository-decorators';

/**
 * Base user model.
 */
@model()
export class BaseUserModel<
  IdType = number | string,
  RoleType extends BaseRoleModel = BaseRoleModel,
> {
  @property({
    type: DataType.ANY,
    primaryKey: true,
  })
  id!: IdType;

  @property({
    type: DataType.STRING,
    unique: PropertyUniqueness.SPARSE,
    default: '',
  })
  username?: string;

  @property({
    type: DataType.STRING,
    unique: PropertyUniqueness.SPARSE,
    default: '',
  })
  email?: string;

  @property({
    type: DataType.STRING,
    unique: PropertyUniqueness.SPARSE,
    default: '',
  })
  phone?: string;

  @property({
    type: DataType.BOOLEAN,
    default: false,
  })
  isEmailVerified?: boolean;

  @property({
    type: DataType.BOOLEAN,
    default: false,
  })
  isPhoneVerified?: boolean;

  @property({
    type: DataType.STRING,
    default: '',
  })
  password?: string;

  @property({
    type: DataType.STRING,
    default: () => new Date().toISOString(),
  })
  createdAt?: string;

  @property({
    type: DataType.STRING,
    default: () => new Date().toISOString(),
  })
  updatedAt?: string;

  @property({
    type: DataType.ARRAY,
    itemType: DataType.ANY,
    default: () => [],
  })
  roleIds?: RoleType['id'][];

  @relation({
    type: RelationType.REFERENCES_MANY,
    model: RoleModel.name,
    foreignKey: 'roleIds',
  })
  roles?: RoleType[];
}

/**
 * User model.
 */
export class UserModel<
  IdType = number | string,
  RoleModel extends BaseRoleModel = BaseRoleModel,
> extends BaseUserModel<IdType, RoleModel> {}

import {UserModel} from './user-model.js';
import {BaseUserModel} from './user-model.js';
import {DataType} from '@e22m4u/js-repository';
import {RelationType} from '@e22m4u/js-repository';
import {model} from '@e22m4u/js-repository-decorators';
import {property} from '@e22m4u/js-repository-decorators';
import {relation} from '@e22m4u/js-repository-decorators';

/**
 * Base access token model.
 */
@model()
export class BaseAccessTokenModel<
  IdType = number | string,
  UserType extends BaseUserModel = BaseUserModel,
> {
  @property({
    type: DataType.ANY,
    primaryKey: true,
  })
  id!: IdType;

  @property({
    type: DataType.STRING,
    default: '',
  })
  userAgent?: string;

  @property({
    type: DataType.STRING,
    default: () => new Date().toISOString(),
  })
  createdAt?: string;

  @property({
    type: DataType.STRING,
    required: true,
  })
  ownerId?: UserType['id'];

  @relation({
    type: RelationType.BELONGS_TO,
    model: UserModel.name,
    foreignKey: 'ownerId',
  })
  owner?: UserType;
}

/**
 * Access token model.
 */
export class AccessTokenModel<
  IdType = number | string,
  UserType extends BaseUserModel = BaseUserModel,
> extends BaseAccessTokenModel<IdType, UserType> {}

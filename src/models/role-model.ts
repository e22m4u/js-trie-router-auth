import {DataType} from '@e22m4u/js-repository';
import {model} from '@e22m4u/js-repository-decorators';
import {PropertyUniqueness} from '@e22m4u/js-repository';
import {property} from '@e22m4u/js-repository-decorators';

/**
 * Base role model.
 */
@model()
export class BaseRoleModel<IdType = number | string> {
  @property({
    type: DataType.ANY,
    primaryKey: true,
  })
  id!: IdType;

  @property({
    type: DataType.STRING,
    required: true,
    unique: PropertyUniqueness.STRICT,
  })
  name?: string;

  @property({
    type: DataType.STRING,
    default: () => new Date().toISOString(),
  })
  createdAt?: string;
}

/**
 * Role model.
 */
@model()
export class RoleModel<
  IdType = number | string,
> extends BaseRoleModel<IdType> {}

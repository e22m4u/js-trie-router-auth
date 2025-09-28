import HttpErrors from 'http-errors';
import {createError} from '../utils/index.js';
import {Localizer} from '@e22m4u/js-localizer';
import {DataFormatValidator} from '../auth-service.js';

export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 80;

/**
 * Password format validator.
 *
 * @param value
 */
export const passwordFormatValidator: DataFormatValidator = function (
  value: unknown,
  localizer: Localizer,
): void {
  if (typeof value !== 'string')
    throw createError(
      HttpErrors.BadRequest,
      'INVALID_PASSWORD_FORMAT',
      localizer.t('validators.dataFormatValidator.invalidPasswordFormatError'),
      {password: value},
    );
  if (value.length < MIN_PASSWORD_LENGTH)
    throw createError(
      HttpErrors.BadRequest,
      'INVALID_PASSWORD_FORMAT',
      localizer.t('validators.dataFormatValidator.minPasswordLengthError'),
      {password: value},
      MIN_PASSWORD_LENGTH,
    );
  if (value.length > MAX_PASSWORD_LENGTH)
    throw createError(
      HttpErrors.BadRequest,
      'INVALID_PASSWORD_FORMAT',
      localizer.t('validators.dataFormatValidator.maxPasswordLengthError'),
      {password: value},
      MAX_PASSWORD_LENGTH,
    );
  if (!/\p{L}/u.test(value) || !/\p{N}/u.test(value))
    throw createError(
      HttpErrors.BadRequest,
      'INVALID_PASSWORD_FORMAT',
      localizer.t('validators.dataFormatValidator.invalidPasswordFormatError'),
      {password: value},
    );
};

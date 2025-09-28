import HttpErrors from 'http-errors';
import {Localizer} from '@e22m4u/js-localizer';
import {createError} from '../utils/index.js';
import {DataFormatValidator} from '../auth-service.js';

/**
 * Email format regex.
 *
 * https://stackoverflow.com/a/46181
 */
export const EMAIL_FORMAT_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Email format validator.
 *
 * @param value
 */
export const emailFormatValidator: DataFormatValidator = function (
  value: unknown,
  localizer: Localizer,
): void {
  if (!value || typeof value !== 'string' || !EMAIL_FORMAT_REGEX.test(value))
    throw createError(
      HttpErrors.BadRequest,
      'INVALID_EMAIL_FORMAT',
      localizer.t('validators.dataFormatValidator.invalidEmailFormatError'),
      {email: value},
    );
};

import HttpErrors from 'http-errors';
import { createError } from '../utils/index.js';
/**
 * Email format regex.
 *
 * https://stackoverflow.com/a/46181
 */
export const EMAIL_FORMAT_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/**
 * Email format validator.
 *
 * @param value
 */
export const emailFormatValidator = function (value, localizer) {
    if (!value || typeof value !== 'string' || !EMAIL_FORMAT_REGEX.test(value))
        throw createError(HttpErrors.BadRequest, 'INVALID_EMAIL_FORMAT', localizer.t('validators.dataFormatValidator.invalidEmailFormatError'), { email: value });
};

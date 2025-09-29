import HttpErrors from 'http-errors';
import { createError } from '../utils/index.js';
/**
 * Phone format regex.
 *
 * https://stackoverflow.com/a/29767609
 */
export const PHONE_FORMAT_REGEX = /^[+]?[0-9]{0,3}\W*[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
/**
 * Phone format validator.
 *
 * @param value
 */
export const phoneFormatValidator = function (value, localizer) {
    if (!value || typeof value !== 'string' || !PHONE_FORMAT_REGEX.test(value))
        throw createError(HttpErrors.BadRequest, 'INVALID_PHONE_FORMAT', localizer.t('validators.dataFormatValidator.invalidPhoneFormatError'), { phone: value });
};

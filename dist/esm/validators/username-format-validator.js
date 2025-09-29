import HttpErrors from 'http-errors';
import { createError } from '../utils/create-error.js';
export const MIN_USERNAME_LENGTH = 4;
export const MAX_USERNAME_LENGTH = 30;
/**
 * Username validator.
 *
 * @param value
 */
export const usernameFormatValidator = function (value, localizer) {
    if (typeof value !== 'string')
        throw createError(HttpErrors.BadRequest, 'INVALID_USERNAME_FORMAT', localizer.t('validators.dataFormatValidator.invalidUsernameFormatError'), { username: value });
    if (value.length < MIN_USERNAME_LENGTH)
        throw createError(HttpErrors.BadRequest, 'INVALID_USERNAME_FORMAT', localizer.t('validators.dataFormatValidator.minUsernameLengthError'), { username: value }, MIN_USERNAME_LENGTH);
    if (value.length > MAX_USERNAME_LENGTH)
        throw createError(HttpErrors.BadRequest, 'INVALID_USERNAME_FORMAT', localizer.t('validators.dataFormatValidator.maxUsernameLengthError'), { username: value }, MAX_USERNAME_LENGTH);
    if (!/^[a-zA-Z]/.test(value))
        throw createError(HttpErrors.BadRequest, 'INVALID_USERNAME_FORMAT', localizer.t('validators.dataFormatValidator.usernameStartLetterError'), { username: value });
    if (!/^[a-zA-Z0-9]+$/.test(value))
        throw createError(HttpErrors.BadRequest, 'INVALID_USERNAME_FORMAT', localizer.t('validators.dataFormatValidator.invalidUsernameFormatError'), { username: value });
};

import {Localizer} from '@e22m4u/js-localizer';
import en from './locales/en.json' with {type: 'json'};
import ru from './locales/ru.json' with {type: 'json'};

/**
 * Auth localizer.
 */
export class AuthLocalizer extends Localizer {}

/**
 * Instance of AuthLocalizer.
 */
export const authLocalizer = new AuthLocalizer({
  dictionaries: {en, ru},
});

const DOT = ".";
const DOLLAR_SIGN = "$";

/**
 * `react-hook-form` turns dot-field names into nested object fields, causing weird behavior when accessing/assigning said fields if they're deeply nested.
 *
 * E.g. with an object like:
 * ```
 *  type FormValues = {
 *      requirements: {
 *          type: {
 *              [key: string]: any
 *          }
 *      }
 *  }
 * ```
 * setting a field named `address.country` inside `requirements.type` can internally be converted into:
 * ```
 *  const formValues: FormValues = {
 *      requirements: {
 *          type:
 *              address: {
 *                  country: "some_value"
 *              }
 *          }
 *      }
 *  }
 * ```
 * But when accessing/assigning this `address.country` field, `react-hook-form` gets confused and has no idea how to access the field:
 * ```
 *  console.log(methods.getValues("requirements.type.address.country")) // returns undefined
 * ```
 *
 * To solve, turn dots into some other character https://github.com/react-hook-form/react-hook-form/issues/3755#issuecomment-943408807
 *
 * @param key string
 * @returns same string with dot characters (.) replaced with dollar signs ($)
 * */
export const undot = (key: string): string => key.replace(DOT, DOLLAR_SIGN);

/**
 * @see {@link undot}
 * @param key string
 * @returns same string with dollar signs ($) replaced with dot characters (.)
 */
export const redot = (key: string): string => key.replace(DOLLAR_SIGN, DOT);

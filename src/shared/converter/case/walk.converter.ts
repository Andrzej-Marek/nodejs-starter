import { forOwn, camelCase, isObject, snakeCase } from "lodash";

/**
 * JUST DONT TOUCH IT
 */

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function walk(obj, cb) {
    const convertedField = Array.isArray(obj) ? [] : {};

    forOwn(obj, (field, keyName) => {
        const shouldInvokeSelfAgain = isObject(field) || Array.isArray(field);
        const isDateField = field instanceof Date;

        if (shouldInvokeSelfAgain && !isDateField) field = walk(field, cb);

        const convertedKeyToCamelCase = cb(keyName);

        // @ts-ignore
        convertedField[convertedKeyToCamelCase] = field;
    });

    return convertedField;
}

export function camelCaseConverter<T>(obj: Object): T {
    // @ts-ignore
    return walk(obj, (keyName: string) => camelCase(keyName));
}

export function snakeCaseConverter<T>(obj: Object): T {
    // @ts-ignore
    return walk(obj, (keyName: string) => snakeCase(keyName));
}

import { isNil, isObject, omitBy } from "lodash";

type Params = {
    [key: string]: unknown;
};

export const buildApiRequestUrl = (url: string, queryParams: Params): string => {
    const keys = Object.keys(omitBy(queryParams, isNil));

    const queryString = keys
        .map(item => {
            const key = isObject(queryParams[item]) ? JSON.stringify(queryParams[item]) : queryParams[item];
            return `${item}=${key}`;
        })
        .join("&");

    if (queryString.length) {
        url = `${url}?${queryString}`;
    }

    return url;
};

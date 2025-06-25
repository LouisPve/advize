export function pick<T, K extends keyof T>(obj: T, ...fields: K[]): Pick<T, K> {
    const newObj = {} as Pick<T, K>;
    for (const field of fields) {
        if (obj[field] !== undefined && (obj[field] === null || !isEmptyObject(obj[field] as object))) {
            newObj[field] = obj[field];
        }
    }
    return newObj;
}

export const isEmptyObject = (obj: object) => Object.entries(obj).length === 0;

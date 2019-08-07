export function objectMapping(source = {}, target) {
    for (const key in source) {
        if (key in target) {
            target[key] = source[key];
        }
    }
    return target;
}

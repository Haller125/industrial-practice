module.exports = function convertProxyArraysToArrays(proxyArray) {
    const result = [];
    for (const item of proxyArray) {
        if (Array.isArray(item)) {
            result.push(convertProxyArraysToArrays(item));
        } else {
            result.push(item);
        }
    }
    return result;
}
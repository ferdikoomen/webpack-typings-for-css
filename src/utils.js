'use strict';

import camelCase from 'camelcase';

/**
 * Convert prop name to "camelCase" and support special cases
 * like prop names with special characters like "{0}"
 * @param key
 * @returns {string}
 */
function toPropName(key) {
    if (/^[a-z][a-z0-9\-_]+/gi.test(key)) {
        return camelCase(key, { locale: 'en-US' });
    }
    return key;
}

/**
 * The keys from the CSS module are in "snake-case", however we want to
 * use "camelCase" variable names in our code. So, we convert the keys
 * to this format!
 */
export function getExports(locals) {
    const exports = {};
    Object.entries(locals).forEach(([key, value]) => {
        exports[toPropName(key)] = value;
    });
    return exports;
}

/**
 * Get the modified source (output of this loader)
 * @param source Original input source
 * @param exports Modified local exports
 */
export function getSource(source, exports) {
    return source.replace(/exports\.locals = \{[\S\s]*\};/gm, `exports.locals = ${JSON.stringify(exports, null, 3)};`);
}

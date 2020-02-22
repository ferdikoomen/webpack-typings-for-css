'use strict';

const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');
const handlebars = require('handlebars');

/**
 * Read and compile the handlebar template
 * @param name Name of the template
 */
function readTemplate(name) {
    const templatePath = path.resolve(__dirname, name);
    const templateContent = fs.readFileSync(templatePath, 'utf8').toString();
    return handlebars.compile(templateContent, {
        strict: true,
        noEscape: true,
        knownHelpersOnly: true,
        knownHelpers: {
            object: true,
        },
    });
}

/**
 * Convert prop name to "camelCase" and support special cases
 * like prop names with special characters like "{0}"
 * @param key
 * @returns {string}
 */
function toPropName(key) {
    if (/^[a-z][a-z0-9\-_]+/gi.test(key)) {
        return camelCase(key);
    }
    return `'${key}'`;
}

/**
 * The keys from the CSS module are in "snake-case", however we want to
 * use "camelCase" variable names in our code. So, we convert the keys
 * to this format!
 */
function getExports(locals) {
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
function getSource(source, exports) {
    return source.replace(/exports\.locals = \{[\S\s]*\};/gm, `exports.locals = ${JSON.stringify(exports)};`);
}

module.exports = {
    readTemplate,
    getExports,
    getSource,
};

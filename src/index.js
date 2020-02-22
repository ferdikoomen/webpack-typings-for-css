'use strict';

const fs = require('fs');
const path = require('path');
const { getOptions } = require('loader-utils');
const utils = require('./utils');

// Read and compile the template (only once, since we can reuse it for each loader)
const template = utils.readTemplate('template.hbs');

/**
 * The 'webpack-typings-for-css' loader writes out Typescript definition files for
 * each imported CSS/SCSS/LESS file. This loader works together with the 'css-loader',
 * the CSS loader provides the logic to load the CSS and create the CSS module definition,
 * this loader reads the exported CSS module identifiers and writes out the definition file.
 *
 * @param source The loaded content from the CSS loader
 */
function loader(source) {
    if (this.cacheable) {
        this.cacheable();
    }

    // The output of the CSS loader will contains the exported CSS identifiers:
    //
    // exports.locals = {
    //     'my-button': '.styles__my-button__3uJig8mNpKSTG82THjk4l2',
    //     'my-table': '.styles__my-table__3uJig8mNpKSTG82THjk4l2',
    //     ...
    // };
    //
    // We need to grab these identifier, since we are interested in the keys,
    // these keys should be written out into a Typescript definition file.
    const match = /exports\.locals = (\{[\S\s]*\});/gm.exec(source);

    // If we have a match then we grab the content of the export,
    // this should be parsable as JSON, from there we can process it.
    if (match && match.length) {
        const options = getOptions(this);
        const localsString = String(match[1]);
        const locals = JSON.parse(localsString);
        const exportType = options && options.exportType === true;
        const exports = utils.getExports(locals);

        // Get the path for the definition file, this is relative to the currently loaded scss file... easy!
        const extension = path.extname(this.resourcePath);
        const definitionFile = this.resourcePath.replace(`${extension}`, `${extension}.d.ts`);
        const definitionFileContent = template({
            exports,
            exportType,
        });

        // Write the definition file, we do not use Webpack's emitFile() method, since
        // that would then track this output file as a dependency. We don't want this,
        // since these files are placed inside the source folder!
        fs.writeFileSync(definitionFile, definitionFileContent);

        // Return the modified source value.
        return utils.getSource(source, exports);
    }
    return source;
}

module.exports = loader;

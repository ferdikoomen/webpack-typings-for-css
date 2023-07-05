'use strict';

import { writeFileSync } from 'fs';
import { extname } from 'path';
import { getExports, getSource } from './utils';
import Handlebars from 'handlebars/runtime';
import $export from './templates/export.hbs';

const template = Handlebars.template($export);

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
    // ___CSS_LOADER_EXPORT___.locals = {
    //     'my-button': '.styles__my-button__3uJig8mNpKSTG82THjk4l2',
    //     'my-table': '.styles__my-table__3uJig8mNpKSTG82THjk4l2',
    //     ...
    // };
    //
    // We need to grab these identifier, since we are interested in the keys,
    // these keys should be written out into a Typescript definition file.
    const match = /___CSS_LOADER_EXPORT___\.locals = (\{[\S\s]*\});/gm.exec(source);

    // If we have a match then we grab the content of the export,
    // this should be parsable as JSON, from there we can process it.
    if (match && match.length) {
        const options = this.getOptions();
        const localsString = String(match[1]).replace(/`/g, '"');

        const locals = JSON.parse(localsString);
        const exportType = options && options.exportType === true;
        const exports = getExports(locals);

        // Get the path for the definition file, this is relative to the currently loaded scss file... easy!
        const extension = extname(this.resourcePath);
        const definitionFile = this.resourcePath.replace(`${extension}`, `${extension}.d.ts`);
        const definitionFileContent = template({
            exports,
            exportType,
        });

        // Write the definition file, we do not use Webpack's emitFile() method, since
        // that would then track this output file as a dependency. We don't want this,
        // since these files are placed inside the source folder!
        writeFileSync(definitionFile, definitionFileContent);

        // Return the modified source value.
        return getSource(source, exports);
    }
    return source;
}

module.exports = loader;

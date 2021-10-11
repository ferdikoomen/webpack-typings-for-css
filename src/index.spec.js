'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const options = require('../webpack.config.js');

test('is generated correctly', done => {
    webpack(options, (err, stats) => {
        if (err) {
            return done(err);
        } else if (stats.hasErrors()) {
            return done(stats.toString());
        }

        console.log('oke');

        const bundlePath = path.resolve(process.cwd(), './test/dist/bundle.js');
        const scssPath = path.resolve(process.cwd(), './test/styles.scss.d.ts');
        const lessPath = path.resolve(process.cwd(), './test/styles.less.d.ts');
        const cssPath = path.resolve(process.cwd(), './test/styles.css.d.ts');

        const bundleExists = fs.existsSync(bundlePath);
        const scssExists = fs.existsSync(scssPath);
        const lessExists = fs.existsSync(lessPath);
        const cssExists = fs.existsSync(cssPath);

        const bundleStats = fs.statSync(bundlePath);
        const scssStats = fs.statSync(scssPath);
        const lessStats = fs.statSync(lessPath);
        const cssStats = fs.statSync(cssPath);

        const bundleContent = fs.readFileSync(bundlePath).toString();
        const scssContent = fs.readFileSync(scssPath).toString();
        const lessContent = fs.readFileSync(lessPath).toString();
        const cssContent = fs.readFileSync(cssPath).toString();

        expect(bundleExists).toBeTruthy();
        expect(scssExists).toBeTruthy();
        expect(lessExists).toBeTruthy();
        expect(cssExists).toBeTruthy();

        expect(bundleStats.size).toBeGreaterThan(0);
        expect(scssStats.size).toBeGreaterThan(0);
        expect(lessStats.size).toBeGreaterThan(0);
        expect(cssStats.size).toBeGreaterThan(0);

        expect(scssContent).toContain('declare const styles = {');
        expect(scssContent).toContain("'button': 'styles__button__Hw0Uqn1lOzgGBl_9PVjw'");

        expect(lessContent).toContain('declare const styles = {');
        expect(lessContent).toContain("'button': 'styles__button__HdpZ09TQC2DxcK3bYi4K'");

        expect(cssContent).toContain('declare const styles = {');
        expect(cssContent).toContain("'button': 'styles__button__eU07H8hhIAVmp4dJuPwH'");

        expect(bundleContent).toContain('"button": "styles__button__Hw0Uqn1lOzgGBl_9PVjw"');
        expect(bundleContent).toContain('"button": "styles__button__HdpZ09TQC2DxcK3bYi4K"');
        expect(bundleContent).toContain('"button": "styles__button__eU07H8hhIAVmp4dJuPwH"');

        done();
    });
});

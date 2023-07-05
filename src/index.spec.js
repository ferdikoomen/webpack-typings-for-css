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

        const scssPath = path.resolve(process.cwd(), './test/styles.scss.d.ts');
        const lessPath = path.resolve(process.cwd(), './test/styles.less.d.ts');
        const cssPath = path.resolve(process.cwd(), './test/styles.css.d.ts');

        const scssExists = fs.existsSync(scssPath);
        const lessExists = fs.existsSync(lessPath);
        const cssExists = fs.existsSync(cssPath);

        const scssStats = fs.statSync(scssPath);
        const lessStats = fs.statSync(lessPath);
        const cssStats = fs.statSync(cssPath);

        const scssContent = fs.readFileSync(scssPath).toString();
        const lessContent = fs.readFileSync(lessPath).toString();
        const cssContent = fs.readFileSync(cssPath).toString();

        expect(scssExists).toBeTruthy();
        expect(lessExists).toBeTruthy();
        expect(cssExists).toBeTruthy();

        expect(scssStats.size).toBeGreaterThan(0);
        expect(lessStats.size).toBeGreaterThan(0);
        expect(cssStats.size).toBeGreaterThan(0);

        expect(scssContent).toContain('declare const styles = {');
        expect(scssContent).toContain("'button': 'styles__button__Hw0Uqn1lOzgGBl_9PVjw'");

        expect(lessContent).toContain('declare const styles = {');
        expect(lessContent).toContain("'button': 'styles__button__HdpZ09TQC2DxcK3bYi4K'");

        expect(cssContent).toContain('declare const styles = {');
        expect(cssContent).toContain("'button': 'styles__button__eU07H8hhIAVmp4dJuPwH'");

        done();
    });
}, 10000);

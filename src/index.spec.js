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

        expect(scssContent).toContain('readonly button: string; // styles__button__2wmORyJZRJFrl_Mc46Dxnh');
        expect(scssContent).toContain('readonly buttonSmall: string; // styles__button--small__1dezcn7Xl7U8em93APXPIU');
        expect(scssContent).toContain('readonly buttonLarge: string; // styles__button--large__2GA-bPwea6oWSnVWqjy_ux');
        expect(scssContent).toContain('readonly buttonWithCamelCaseName: string; // styles__buttonWithCamelCaseName__35x0j9lg86O1UbVPBZn3ho');

        expect(lessContent).toContain('readonly button: string; // styles__button__jNfkr4DnrAkEZBPNRF');
        expect(lessContent).toContain('readonly buttonSmall: string; // styles__button--small__2zXKUL0g9t8moKnqdjmAO7');
        expect(lessContent).toContain('readonly buttonLarge: string; // styles__button--large__3xOwIYBN_WhgO_Vy46i_Fq');
        expect(lessContent).toContain('readonly buttonWithCamelCaseName: string; // styles__buttonWithCamelCaseName__302ijMvSCfstQQ9NGdP9sM');

        expect(cssContent).toContain('readonly button: string; // styles__button__wzc-BjG34gg0YTmmp71Mh');
        expect(cssContent).toContain('readonly buttonSmall: string; // styles__button--small__Jl0thjpdKMgQgK4SczMV_');
        expect(cssContent).toContain('readonly buttonLarge: string; // styles__button--large__2vSRkXkjXTxZOTMAbhDH_n');
        expect(cssContent).toContain('readonly buttonWithCamelCaseName: string; // styles__buttonWithCamelCaseName__2hmgDhqZWg8JYMp3YIKEQ4');

        expect(bundleContent).toContain('"button":"styles__button__2wmORyJZRJFrl_Mc46Dxnh"');
        expect(bundleContent).toContain('"buttonSmall":"styles__button--small__1dezcn7Xl7U8em93APXPIU');
        expect(bundleContent).toContain('"buttonLarge":"styles__button--large__2GA-bPwea6oWSnVWqjy_ux');
        expect(bundleContent).toContain('"buttonWithCamelCaseName":"styles__buttonWithCamelCaseName__35x0j9lg86O1UbVPBZn3ho');
        expect(bundleContent).toContain('"button":"styles__button__jNfkr4DnrAkEZBPNRF');
        expect(bundleContent).toContain('"buttonSmall":"styles__button--small__2zXKUL0g9t8moKnqdjmAO7');
        expect(bundleContent).toContain('"buttonLarge":"styles__button--large__3xOwIYBN_WhgO_Vy46i_Fq');
        expect(bundleContent).toContain('"buttonWithCamelCaseName":"styles__buttonWithCamelCaseName__302ijMvSCfstQQ9NGdP9sM');
        expect(bundleContent).toContain('"button":"styles__button__wzc-BjG34gg0YTmmp71Mh');
        expect(bundleContent).toContain('"buttonSmall":"styles__button--small__Jl0thjpdKMgQgK4SczMV_');
        expect(bundleContent).toContain('"buttonLarge":"styles__button--large__2vSRkXkjXTxZOTMAbhDH_n');
        expect(bundleContent).toContain('"buttonWithCamelCaseName":"styles__buttonWithCamelCaseName__2hmgDhqZWg8JYMp3YIKEQ4');

        done();
    })
});

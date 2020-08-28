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

        expect(scssContent).toContain('declare const styles = {');
        expect(scssContent).toContain("button: 'styles__button__16qQ3lAe3ISxt3EdS7H8go'");
        expect(scssContent).toContain("buttonSmall: 'styles__button--small__3Mq0Io0Rf03UwahBwABe4L'");
        expect(scssContent).toContain("buttonLarge: 'styles__button--large__3bizO4nrDH_UJqz60AUbxe'");
        expect(scssContent).toContain(
            "buttonWithCamelCaseName: 'styles__buttonWithCamelCaseName__1DzACMqrtMVOsflVqK15Yk'"
        );
        expect(scssContent).toContain('export type ClassName');
        expect(scssContent).toContain("'styles__button__16qQ3lAe3ISxt3EdS7H8go' |");
        expect(scssContent).toContain("'styles__button--small__3Mq0Io0Rf03UwahBwABe4L' |");
        expect(scssContent).toContain("'styles__button--large__3bizO4nrDH_UJqz60AUbxe' |");

        expect(lessContent).toContain('declare const styles = {');
        expect(lessContent).toContain("button: 'styles__button__2tRZ10wzOJn1TSZ26v9AQy'");
        expect(lessContent).toContain("buttonSmall: 'styles__button--small__3NwBmslscBVh4iESNeP3Bv'");
        expect(lessContent).toContain("buttonLarge: 'styles__button--large__34gkTXrQ2It8RKP0Y9GB6N'");
        expect(lessContent).toContain(
            "buttonWithCamelCaseName: 'styles__buttonWithCamelCaseName__2oz5M6GprAaZnxLw8wzD5z'"
        );
        expect(cssContent).toContain('declare const styles = {');
        expect(cssContent).toContain("button: 'styles__button__2VaeAG_8llAE34lZeT8dsE'");
        expect(cssContent).toContain("buttonSmall: 'styles__button--small__1--z5UAWAd6fHIt__9Q-Cm'");
        expect(cssContent).toContain("buttonLarge: 'styles__button--large__2Ns7M4Wyi5f2ewSbDOt0l4'");
        expect(cssContent).toContain(
            "buttonWithCamelCaseName: 'styles__buttonWithCamelCaseName__2zU_D6vvbwCcjtgHFHR3Bk'"
        );

        expect(bundleContent).toContain('"button": "styles__button__2tRZ10wzOJn1TSZ26v9AQy"');
        expect(bundleContent).toContain('"buttonSmall": "styles__button--small__3NwBmslscBVh4iESNeP3Bv"');
        expect(bundleContent).toContain('"buttonLarge": "styles__button--large__34gkTXrQ2It8RKP0Y9GB6N"');
        expect(bundleContent).toContain(
            '"buttonWithCamelCaseName": "styles__buttonWithCamelCaseName__2oz5M6GprAaZnxLw8wzD5z"'
        );
        expect(bundleContent).toContain('"button": "styles__button__2VaeAG_8llAE34lZeT8dsE"');
        expect(bundleContent).toContain('"buttonSmall": "styles__button--small__1--z5UAWAd6fHIt__9Q-Cm"');
        expect(bundleContent).toContain('"buttonLarge": "styles__button--large__2Ns7M4Wyi5f2ewSbDOt0l4"');
        expect(bundleContent).toContain(
            '"buttonWithCamelCaseName": "styles__buttonWithCamelCaseName__2zU_D6vvbwCcjtgHFHR3Bk"'
        );
        expect(bundleContent).toContain('"button": "styles__button__16qQ3lAe3ISxt3EdS7H8go"');
        expect(bundleContent).toContain('"buttonSmall": "styles__button--small__3Mq0Io0Rf03UwahBwABe4L"');
        expect(bundleContent).toContain('"buttonLarge": "styles__button--large__3bizO4nrDH_UJqz60AUbxe"');
        expect(bundleContent).toContain(
            '"buttonWithCamelCaseName": "styles__buttonWithCamelCaseName__1DzACMqrtMVOsflVqK15Yk'
        );

        done();
    });
});

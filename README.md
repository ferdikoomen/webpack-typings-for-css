# Webpack Typings for CSS loader

[![NPM](https://badgen.net/npm/v/webpack-typings-for-css)](https://www.npmjs.com/package/webpack-typings-for-css)
[![License](https://badgen.net/npm/license/webpack-typings-for-css)](https://www.npmjs.com/package/webpack-typings-for-css)
[![Dependencies](https://badgen.net/david/dep/ferdikoomen/webpack-typings-for-css)](https://david-dm.org/ferdikoomen/webpack-typings-for-css)
[![Build Size](https://badgen.net/bundlephobia/minzip/webpack-typings-for-css)](https://bundlephobia.com/result?p=webpack-typings-for-css)
[![Build Status](https://badgen.net/travis/ferdikoomen/webpack-typings-for-css/master)](https://travis-ci.org/ferdikoomen/webpack-typings-for-css)
[![Quality](https://badgen.net/lgtm/grade/javascript/g/ferdikoomen/webpack-typings-for-css)](https://lgtm.com/projects/g/ferdikoomen/webpack-typings-for-css)

> Webpack loader that generates TypeScript typings for CSS modules

## Installation

```
npm install webpack-typings-for-css --save-dev
```

**webpack.config.js**

```javascript
module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'webpack-typings-for-css'
            }, {
                loader: 'css-loader',
                options: {
                    localsConvention: 'camelCaseOnly',
                    modules: {
                        localIdentName: '[name]__[local]__[hash:base64]'
                    }
                }
            }]
        }]
    }
};
```

## Example

Let's say we are building a simple React button component. And we have this file:
`~/src/button/style.scss` in our project with the following content:

```scss
.button {
    color: black;
    background: white;
    font-size: 12px;
    padding: 10px;

    &--small {
        padding: 5px;
        font-size: 10px;
    }

    &--large {
        padding: 20px;
        font-size: 14px;
    }
}
```

When we add the `webpack-typings-for-css` loader, this will generate a TypeScript 
definition file `~/src/button/style.scss.d.ts` with the following content:

```typescript
interface ClassNames {
    readonly button: string;
    readonly buttonSmall: string;
    readonly buttonLarge: string;
}
declare const styles: ClassNames;
export default styles;
```

```typescript
import styles from './styles.scss';

console.log(styles.button);
console.log(styles.buttonSmall);
console.log(styles.buttonLarge);
```

In your button component you can now import the styling file and get type hints
with the available classNames. Plus you can use 'normal' readable imports and
during runtime the application will use the unique CSS module names:

```typescript jsx
import * as React from 'react';

import styles from './styles.scss';

export const Button = () => (
    <button className={styles.button}>Hello World!</button>
);
```

## Known issues

As the loader generates typing files, it is wise to tell webpack to ignore them.
The fix is luckily very simple. Webpack ships with a "WatchIgnorePlugin" out of the box.
Simply add this to your webpack plugins:

```javascript
plugins: [
    new webpack.WatchIgnorePlugin([
        /css\.d\.ts$/
    ]),
    ...
]
```

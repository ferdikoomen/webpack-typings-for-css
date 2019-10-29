'use strict';

// This works around the fact we use ES named exports for styles, e.g.:
// import * as styles from './styles.scss'.
// import styles from './styles.scss'.
// https://github.com/keyanzhang/identity-obj-proxy/issues/8
const proxy = new Proxy(
    {},
    {
        get: function(target, key) {
            if (key === '__esModule' || key === 'default') {
                return proxy;
            }
            return key;
        },
    }
);

module.exports = proxy;

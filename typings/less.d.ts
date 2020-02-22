/**
 * In your project your are using CSS modules, so you can import styles
 * using the following standard imports:
 *
 * <code>
 * import styles from './styles.less';
 *
 * console.log(styles.myClassName);
 * </code>
 *
 * ...However, since we are using Typescript we want to have type definitions for
 * the imported modules. For this we are using the 'webpack-typings-for-css' loader.
 * This loader will generate the .d.ts definition files next to our stylesheets.
 * However, when we do a clean build we are missing these files, so we need to
 * register a generic module so the Typescript compiler will not complain about
 * any missing modules.
 */
declare module '*.less' {

    declare const styles: {
        readonly [key: string]: string;
    };

    export type ClassName = string;

    export default styles;
}

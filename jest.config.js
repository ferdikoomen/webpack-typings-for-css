module.exports = {
    testRegex: '\\.spec\\.js',
    testEnvironment: 'node',
    moduleNameMapper: {
        '\\.hbs$': '<rootDir>/src/templates/__mocks__/index.js',
    },
    collectCoverageFrom: [
        'dist/*.js',
        '!**/node_modules/**',
    ]
};

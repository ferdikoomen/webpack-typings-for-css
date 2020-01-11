module.exports = {
    testRegex: '\\.spec\\.js',
    testEnvironment: 'node',
    collectCoverageFrom: [
        'src/*.js',
        '!**/node_modules/**',
    ]
};

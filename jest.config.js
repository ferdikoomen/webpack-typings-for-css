module.exports = {
    testRegex: '\\.spec\\.js',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/*.js',
        '!**/node_modules/**',
    ]
};

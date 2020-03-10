// simulates a global browser environment using jsdom
require('browser-env')();

// emulate a full ES2015+ environment
require('@babel/polyfill');

// register babel
require('@babel/register')({
    ignore: ['node_modules/*'],
    extensions: ['.ts', '.tsx'],
    cache: true,
    inputSourceMap: false,
    sourceMaps: false
});

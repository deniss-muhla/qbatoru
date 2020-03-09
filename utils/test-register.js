// register babel
require('@babel/register')({
    ignore: ['node_modules/*'],
    extensions: ['.ts', '.tsx'],
    cache: true
});

// emulate a full ES2015+ environment
require('@babel/polyfill');

// simulates a global browser environment using jsdom
require('browser-env')();

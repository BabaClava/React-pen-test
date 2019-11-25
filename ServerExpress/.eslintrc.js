module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "plugins": ["promise"],
    "rules": {
        // "promise/always-return": "error",
        "promise/no-return-wrap": "error",
        "promise/param-names": "error",
        "promise/catch-or-return": "error",
        "promise/no-native": "off",
        "promise/no-nesting": "warn",
        "promise/no-promise-in-callback": "warn",
        // "promise/no-callback-in-promise": "warn",
        // "promise/avoid-new": "warn",
        "promise/no-new-statics": "error",
        // "promise/no-return-in-finally": "warn",
        "promise/valid-params": "warn"
    }
};

export default {
    root: true,
    extends: [
        'google', // Extends Google style guide
        'plugin:react/recommended', // React-specific linting rules
    ],
    parser: '@babel/eslint-parser', // Updated parser (babel-eslint is deprecated)
    parserOptions: {
        ecmaVersion: '2021', // Allows the latest JavaScript features
        sourceType: 'module', // Enables ES Modules (import/export)
        requireConfigFile: false, // Required for @babel/eslint-parser to work without a Babel config
    },
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    plugins: ['react'], // Use React plugin
    rules: {
        'react/prop-types': 'off', // Disable prop-types rule (use TypeScript or other validation instead)
        'require-jsdoc': 'off', // Optional: Disable JSDoc requirement from Google style guide
    }
};

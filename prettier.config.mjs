/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */

/** @type { PrettierConfig | TailwindConfig } */
const config = {
    semi: true,
    useTabs: false,
    singleQuote: true,
    jsxSingleQuote: false,
    bracketSpacing: true,
    bracketSameLine: false,
    tabWidth: 4,
    printWidth: 150,
    endOfLine: 'auto',
    quoteProps: 'as-needed',
    arrowParens: 'always',
    trailingComma: 'es5',
    plugins: ['prettier-plugin-tailwindcss'],
};

export default config;

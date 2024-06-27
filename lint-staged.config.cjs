const config = {
    '*.{js,jsx,cjs,mjs,ts,tsx}': ['pnpm run lint', 'pnpm run formatter'],
    '*.{css,json,yaml,md,mdx}': ['pnpm run formatter'],
};

module.exports = config;

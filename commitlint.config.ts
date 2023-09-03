import type { UserConfig } from '@commitlint/types';

const commitlintConfig = {
    extends: ['@commitlint/config-conventional'],
} satisfies UserConfig;

export default commitlintConfig;

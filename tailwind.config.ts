import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

import tailwindcssForms from '@tailwindcss/forms';
import tailwindcssTypography from '@tailwindcss/typography';
import tailwindcssContainerQueries from '@tailwindcss/container-queries';

import type { Config } from 'tailwindcss';

const config = {
    content: ['./src/**/*.{ts,tsx}'],
    darkMode: ['selector'],
    theme: {
        extend: {
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                },
            },
            colors: {
                primary: colors.cyan,
            },
            fontFamily: {
                sans: [
                    ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
                    { fontFeatureSettings: "'cv02', 'cv03', 'cv04', 'cv09', 'cv10', 'cv11'" },
                ],
            },
            screens: {
                '2xl': '1536px',
            },
        },
    },
    plugins: [tailwindcssForms, tailwindcssTypography, tailwindcssContainerQueries],
} satisfies Config;

export default config;

import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

import type { Config } from 'tailwindcss';

const tailwindConfig = {
    content: ['./src/**/*.{ts,tsx}'],
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
                sans: [['Inter var', ...defaultTheme.fontFamily.sans], { fontFeatureSettings: "'cv02', 'cv03', 'cv04', 'cv11'" }],
            },
            screens: {
                '2xl': '1536px',
            },
        },
    },
    plugins: [],
} satisfies Config;

export default tailwindConfig;

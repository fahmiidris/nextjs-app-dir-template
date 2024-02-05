import * as React from 'react';

import { useTheme } from 'next-themes';

export function ThemeWatcher() {
    const { resolvedTheme, setTheme } = useTheme();

    React.useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');

        function onMediaChange() {
            const systemTheme = media.matches ? 'dark' : 'light';

            if (resolvedTheme === systemTheme) {
                setTheme('system');
            }
        }

        onMediaChange();

        media.addEventListener('change', onMediaChange);

        return () => {
            media.removeEventListener('change', onMediaChange);
        };
    }, [resolvedTheme, setTheme]);

    return null;
}

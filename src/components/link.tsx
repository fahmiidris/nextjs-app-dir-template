import * as React from 'react';

import NextLink, { type LinkProps } from 'next/link';

export type TLinkProps = {
    openNewTab?: boolean;
} & React.ComponentPropsWithRef<'a'> &
    LinkProps;

const Link = React.forwardRef<HTMLAnchorElement, TLinkProps>(function _Link({ href, openNewTab = false, children, ...props }, ref) {
    const isNewTab = openNewTab ? openNewTab : !href.startsWith('/') && !href.startsWith('#') && !href.startsWith('?');

    if (!isNewTab) {
        return (
            <NextLink href={href} ref={ref} {...props}>
                {children}
            </NextLink>
        );
    }

    return (
        <a href={href} ref={ref} {...props} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
});

export default Link;

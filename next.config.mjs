import nodeURL from 'node:url';
import jiti from 'jiti';

const tsFile = jiti(nodeURL.fileURLToPath(import.meta.url));

tsFile('./src/env.ts');

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
};

export default withBundleAnalyzer(config);

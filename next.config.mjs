import './src/env.mjs';

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
};

export default withBundleAnalyzer(config);

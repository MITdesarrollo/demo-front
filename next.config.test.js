/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    api: 'https://api-test.dreamon.gift',
    apiImages: 'https://dreamonimagescdn.azureedge.net/dreamonimagescontainer',
    apiLogoSmall:
      'https://dreamonimagescdn.azureedge.net/dreamonimagescontainer/[header]_logoDreamon.png',
    apiLogoMedium:
      'https://dreamonimagescdn.azureedge.net/dreamonimagescontainer/[header]_logoDreamonX2.png',
    apilogoBlack:
      'https://dreamonimagescdn.azureedge.net/dreamonimagescontainer/[menu]_dreamonLogoBlack.svg',
    JWT_SECRET_KEY: 'btey856584^&%&^%&^fbtdfb8g5l92b5nc8%%%',
  },
  images: {
    domains: ['dreamonimagescdn.azureedge.net', 'backoffice-test.dreamon.gift'],
  },
  output: 'standalone'
};

module.exports = nextConfig;

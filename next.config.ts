import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    images: {
    domains: ['farmxpertapi.runasp.net'], 
  },
 
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

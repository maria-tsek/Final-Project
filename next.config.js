/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: [
      "cdn.pixabay.com",
      "st.depositphotos.com",
      "manimou.gr",
      "exploringgreece.tv",
      "www.kathimerini.gr",
      "exit.gr",
    ],
  },
};

module.exports = nextConfig;

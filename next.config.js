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
      "www.visitgreece.gr",
      "www.beskosexp.gr",
      "png.pngtree.com",
      "st4.depositphotos.com",
      "thecaller.gr",
      "live.staticflickr.com",
      "tolo-taxi.com",
      "kalamatajournal.gr",
    ],
  },
};

module.exports = nextConfig;

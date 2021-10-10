// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    root: '/src/index.html',
    src: '/',
    public: '/',
    "node_modules/@fortawesome/fontawesome-free/webfonts": {
      "url": "/webfonts",
      "static": true,
      "resolve": false
    }
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};

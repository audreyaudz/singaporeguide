// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: {url: '/'},
    public: {url: '/', static: false},    
    "node_modules/@fortawesome/fontawesome-free/webfonts": {
      "url": "/webfonts",
      "static": true,
      "resolve": false
    }
  },
  plugins: [
    "@marlonmarcello/snowpack-plugin-pug"    
  ],
  packageOptions: {
    /* ... */
    rollup: {
      plugins: [require('rollup-plugin-pnp-resolve')()],
    },
  },
  devOptions: {
    openUrl: 'index.html'
  },
  buildOptions: {

  },

};

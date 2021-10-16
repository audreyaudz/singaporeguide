const proxy = require('http2-proxy');
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
  routes: [
    {
      src: '/api/.*',
      dest: (req, res) => {
        // remove /api prefix (optional)
        //req.url = req.url.replace(/^/api//, '/');

        return proxy.web(req, res, {
          hostname: 'localhost',
          port: 3001,
        });
      },
    },
    {
      src: '/images/thi/.*',
      dest: (req, res) => {
        // remove /api prefix (optional)
        //req.url = req.url.replace(/^/api//, '/');

        return proxy.web(req, res, {
          hostname: 'localhost',
          port: 3001,
        });
      },
    },
  ]

};

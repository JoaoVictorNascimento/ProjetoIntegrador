/* eslint-disable import/no-dynamic-require, import/no-extraneous-dependencies */

const fs = require('fs');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');

const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = (proxy, allowedHost) => {
    return {
        disableHostCheck:
      !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',

        compress: true,

        clientLogLevel: 'none',

        contentBase: paths.appPublic,

        watchContentBase: true,

        hot: true,

        transportMode: 'ws',

        injectClient: false,

        publicPath: '/',

        quiet: true,

        watchOptions: {
            ignored: ignoredFiles(paths.appSrc),
        },
        https: protocol === 'https',
        host,
        overlay: false,
        historyApiFallback: {
            disableDotRule: true,
        },
        public: allowedHost,
        proxy,
        before(app, server) {
            if (fs.existsSync(paths.proxySetup)) {
                require(paths.proxySetup)(app);
            }

            app.use(evalSourceMapMiddleware(server));

            app.use(errorOverlayMiddleware());

            app.use(noopServiceWorkerMiddleware());
        },
    };
};
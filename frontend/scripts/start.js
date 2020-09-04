/* eslint-disable import-helpers/order-imports, import/no-dynamic-require, import/no-extraneous-dependencies, no-console, max-len */

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
    throw err;
});

require('../config/env');

const fs = require('fs');
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
const chalk = require('react-dev-utils/chalk');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const clearConsole = require('react-dev-utils/clearConsole');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const {
    choosePort,
    createCompiler,
    prepareProxy,
    prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');

const paths = require('../config/paths');
const configFactory = require('../config/webpack.config');
const createDevServerConfig = require('../config/webpackDevServer.config');

const useYarn = fs.existsSync(paths.yarnLockFile);
const isInteractive = process.stdout.isTTY;

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.HOST) {
    console.log(
        chalk.cyan(
            `Attempting to bind to HOST environment variable: ${chalk.yellow(
                chalk.bold(process.env.HOST),
            )}`,
        ),
    );
    console.log(
        'If this was unintentional, check that you haven\'t mistakenly set it in your shell.',
    );
    console.log(
        `Learn more here: ${chalk.yellow('https://bit.ly/CRA-advanced-config')}`,
    );
    console.log();
}

checkBrowsers(paths.appPath, isInteractive)
    .then(() => {
        return choosePort(HOST, DEFAULT_PORT);
    })
    .then(port => {
        if (port == null) {
            return;
        }
        const config = configFactory('development');
        const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
        const appName = require(paths.appPackageJson).name;
        const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';
        const urls = prepareUrls(protocol, HOST, port);

        const proxySetting = require(paths.appPackageJson).proxy;
        const proxyConfig = prepareProxy(proxySetting, paths.appPublic);

        const serverConfig = createDevServerConfig(
            proxyConfig,
            urls.lanUrlForConfig,
        );

        let devServer;

        const devSocket = {
            warnings: warnings => devServer.sockWrite(devServer.sockets, 'warnings', warnings),
            errors: errors => devServer.sockWrite(devServer.sockets, 'errors', errors),
        };

        const compiler = createCompiler({
            appName,
            config,
            devSocket,
            urls,
            useYarn,
            tscCompileOnError,
            webpack,
        });

        devServer = new WebpackDevServer(compiler, serverConfig);

        devServer.listen(port, HOST, err => {
            if (err) {
                console.log(err);
                return;
            }
            if (isInteractive) {
                clearConsole();
            }

            if (process.env.NODE_PATH) {
                console.log(
                    chalk.yellow(
                        'Setting NODE_PATH to resolve modules absolutely has been deprecated in favor of setting baseUrl in jsconfig.json (or tsconfig.json if you are using TypeScript) and will be removed in a future major release of create-react-app.',
                    ),
                );
                console.log();
            }

            console.log(chalk.cyan('Starting the development server...\n'));
            openBrowser(urls.localUrlForBrowser);
        });

        ['SIGINT', 'SIGTERM'].forEach(sig => {
            process.on(sig, () => {
                devServer.close();
                process.exit();
            });
        });
    })
    .catch(err => {
        if (err && err.message) {
            console.log(err.message);
        }
        process.exit(1);
    });

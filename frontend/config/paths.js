/* eslint-disable import/no-dynamic-require */

const fs = require('fs');
const path = require('path');
const url = require('url');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

console.log({resolveApp, envPublicUrl});

function ensureSlash(inputPath, needsSlash) {
    const hasSlash = inputPath.endsWith('/');
    if (hasSlash && !needsSlash) {
        return inputPath.substr(0, inputPath.length - 1);
    } if (!hasSlash && needsSlash) {
        return `${inputPath}/`;
    }
    return inputPath;

}

const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;


function getServedPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
    const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
    return ensureSlash(servedUrl, true);
}

const moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'json',
    'web.jsx',
    'jsx',
];

const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(ext => fs.existsSync(resolveFn(`${filePath}.${ext}`)));

    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};

module.exports = {
    dotenv: resolveApp('.env'),
    appPath: resolveApp('.'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveModule(resolveApp, 'src/index'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appJsConfig: resolveApp('jsconfig.json'),
    yarnLockFile: resolveApp('yarn.lock'),
    testsSetup: resolveModule(resolveApp, 'src/setupTests'),
    proxySetup: resolveApp('src/setupProxy.js'),
    appNodeModules: resolveApp('node_modules'),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json')),
    antdTheme: resolveApp('src/theme/antd.less'),
};

module.exports.moduleFileExtensions = moduleFileExtensions;
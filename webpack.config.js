console.log('Node environment:', process.env.NODE_ENV);
console.log('Target machine:', process.env.TARGET_MACHINE);

/**
 * TARGET_MACHINE is helpful to determine, where the application is running currently.
 * We have different paths for API, if the application runs on localhost and when it runs on server
 */
process.env.TARGET_MACHINE = process.env.TARGET_MACHINE.trim();

/**
 * ENVIRONMENT variable prepares build for development/production/testing etc.
 */
process.env.NODE_ENV = process.env.NODE_ENV.trim();

switch (process.env.NODE_ENV) {
  case 'dev':
    process.env.AOT = 'DISABLED';
    console.log('Building as development... Ahead of Time-Compilation is: ', process.env.AOT);
    module.exports = require('./config/webpack.dev');
    break;
  case 'prod':
    process.env.AOT = 'ENABLED';
    console.log('Building as production... Ahead of Time-Compilation is: ', process.env.AOT);
    module.exports = require('./config/webpack.prod');
    break;
  default:
    throw new Error('Build environment (process.env.NODE_ENV is not set correctly)');
}
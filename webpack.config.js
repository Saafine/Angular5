console.log('Node environment:', process.env.NODE_ENV);

const ENVIRONMENT = process.env.NODE_ENV.trim();
switch (ENVIRONMENT) {
  case 'dev':
  case 'development':
    console.log('Building as development...');
    module.exports = require('./config/webpack.dev');
    break;
  case 'prod':
  case 'production':
    console.log('Building as production...');
    console.log('[!] Make sure to run "npm run lint" before pushing !');
    console.log('[!] Make sure to keep your packages updated (npm outdated) !');
    module.exports = require('./config/webpack.prod');
    break;
  default:
    console.log('Node environment: undefined -> building as development...');
    module.exports = require('./config/webpack.dev');
}

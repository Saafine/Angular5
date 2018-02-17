/**
 * TARGET_MACHINE is helpful to determine, where the application is running currently.
 * We have different paths for API, if the application runs on localhost and when it runs on server
 */
let ENV_CONFIG;
if (TARGET_MACHINE === 'localhost') {
  ENV_CONFIG = require('./environment/localhost.config');
} else if (TARGET_MACHINE === 'server') {
  ENV_CONFIG = require('./environment/server.config');
}

/**
 * ASSIGN ENVIRONMENTAL VARIABLES
 */
export const API_ADDRESS = ENV_CONFIG._API_ADDRESS;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration letiables and their potential values.
 */
var config = {
  /**
   * Array of application names.
   */
  app_name: ['lt-api-js'],
  /**
   * Your New Relic license key.
   */
  license_key: 'XXXX',
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: 'info'
  },
  browser_monitoring: { enabled: true }
};

exports.default = config;
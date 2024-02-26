const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  video: true,
  videoCompression: true,
  e2e: {
    baseUrl: 'http://develop.easy-test',
    setupNodeEvents(on, config) {
      config.reporter = 'mochawesome';
      config.reporterOptions = {
        reportDir: 'cypress/report/mochawesome-report',
        overwrite: true,
        html: true,
        json: false,
        timestamp: 'mmddyyyy_HHMMss',
      };
    },
  },
});

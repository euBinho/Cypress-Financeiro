const { defineConfig } = require('cypress');
const fs = require('fs');

module.exports = defineConfig({
  chromeWebSecurity: false,
  video: true,
  videoCompression: true,
  e2e: {
    baseUrl: 'http://develop.easy-test',
    setupNodeEvents(on, config) {
      on('task', {
        fileExists(filePath) {
          return fs.existsSync(filePath);
        },
        listFiles(directoryPath) {
          return fs.readdirSync(directoryPath);
        },
      });
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

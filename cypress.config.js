const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 8000,
  retries: { runMode: 1, openMode: 0 },

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'Sauce Demo - Cypress Test Report',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  e2e: {
    // Override with CYPRESS_BASE_URL if needed.
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },

  // These are the OFFICIAL PUBLIC demo credentials published on saucedemo.com.
  // Override any of them with CYPRESS_<name> environment variables.
  env: {
    standardUser: 'standard_user',
    lockedOutUser: 'locked_out_user',
    demoPassword: 'secret_sauce',
  },
});

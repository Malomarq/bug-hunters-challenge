const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true,
  },

  e2e: {
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

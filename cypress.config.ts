import { defineConfig } from 'cypress';

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true
  },
  component: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    devServer: {
      framework: 'react', // Change this based on your framework
      bundler: 'vite' // Or Webpack, depending on your setup
    }
  }
});
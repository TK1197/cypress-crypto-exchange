import { defineConfig } from "cypress";

export default defineConfig({
 
  env: {
    url : 'https://cake-la-pepe-exchange.vercel.app/'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern : 'cypress/test cases/*.cy.ts'
  },
});

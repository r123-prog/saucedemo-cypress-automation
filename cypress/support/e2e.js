import 'cypress-mochawesome-reporter/register';
import './commands';

// Global setup: keep tests deterministic by silencing third-party error telemetry
// that the demo app sends. Application behaviour under test is not affected.
beforeEach(() => {
  cy.intercept({ method: 'POST', url: '**/events.backtrace.io/**' }, { statusCode: 204 });
});

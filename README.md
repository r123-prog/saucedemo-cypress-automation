# Sauce Demo – Cypress Test Automation Framework

An end-to-end web test automation framework built with **Cypress, JavaScript, and Node.js** against the public Sauce Demo e-commerce application.

The framework is designed to validate critical user journeys, including authentication, product browsing, shopping cart operations, and checkout workflows. It includes positive and negative testing scenarios, automated reporting, and Continuous Integration through GitHub Actions.

---

## Business Objective

An online store can lose revenue when essential features such as login, shopping cart, or checkout stop working.

This automation framework validates critical e-commerce workflows to detect regressions early and improve application reliability before issues reach end users.

---

## Technologies

| Area | Technology |
|---|---|
| Test Automation | Cypress 13 |
| Programming Language | JavaScript |
| Runtime Environment | Node.js 18+ |
| Package Manager | npm |
| Design Approach | Page Object Model, Custom Commands, Fixtures |
| Test Reporting | cypress-mochawesome-reporter |
| CI/CD | GitHub Actions |
| Browsers | Google Chrome, Mozilla Firefox, Microsoft Edge (local execution) |
| Version Control | Git & GitHub |

---

## Project Architecture

```text
saucedemo-cypress-automation/
│
├── .github/
│   └── workflows/
│       └── cypress.yml
│
├── cypress/
│   ├── e2e/
│   │   ├── auth/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── network/
│   │
│   ├── fixtures/
│   ├── pages/
│   ├── support/
│   │
│   ├── reports/
│   ├── screenshots/
│   └── videos/
│
├── scripts/
│   └── report-summary.js
│
├── cypress.config.js
├── package.json
├── package-lock.json
├── .nvmrc
└── README.md
```

### Design Decisions

- **Page Object Model (POM):** Separates page interactions from test scenarios to improve maintainability.
- **Centralized Selectors:** Keeps element selectors organized and reusable.
- **Custom Commands:** Provides reusable Cypress commands for common actions.
- **Test Fixtures:** Separates test data from test logic.
- **Test Case Identification:** Uses unique test IDs to improve traceability between requirements and execution results.

---

## Prerequisites

Make sure the following tools are installed:

- Node.js 18 or newer (the project uses Node.js 20 through `.nvmrc`).
- npm.
- Git.
- Google Chrome, Mozilla Firefox, or Microsoft Edge for the corresponding local browser runs.

Cypress also includes Electron for its default headless execution.

---

## Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd saucedemo-cypress-automation
```

### 3. Install dependencies

```bash
npm install
```

For reproducible installations in CI environments, the generated `package-lock.json` should be committed to the repository.

---

## Running the Tests

### Interactive Test Runner

```bash
npm run cy:open
```

### Headless Execution

Run all test suites using the default browser:

```bash
npm test
```

### Cross-Browser Testing

Run tests on specific browsers:

```bash
npm run test:chrome
npm run test:firefox
npm run test:edge
```

### Headed Execution

Run tests with a visible Chrome browser:

```bash
npm run test:headed
```

### Run Specific Test Suites

Execute individual testing areas:

```bash
npm run test:auth
npm run test:products
npm run test:cart
npm run test:checkout
npm run test:network
```

### Clean Generated Files

Remove previous reports, screenshots, and videos:

```bash
npm run clean
```

---

## Environment Configuration

The application URL and test credentials can be overridden using Cypress environment variables.

Default application URL:

```text
https://www.saucedemo.com
```

Example:

```bash
CYPRESS_BASE_URL=https://www.saucedemo.com npm test
```

The Cypress configuration also defines the following default demo credentials:

| User Type | Username | Password |
|---|---|---|
| Standard User | standard_user | secret_sauce |
| Locked Out User | locked_out_user | secret_sauce |

These are public demo credentials provided by Sauce Demo.

---

## Test Scenarios

The framework covers the following major testing areas:

### 1. Authentication Testing

- Valid login.
- Invalid username.
- Invalid password.
- Empty login fields.
- Missing username.
- Missing password.
- Locked-out user validation.
- Logout functionality.
- Re-login after logout.
- Session persistence after page reload.
- Protected page access without authentication.
- Protected page access after logout.

### 2. Product Catalogue Testing

- Verify product listing.
- Validate product names and prices.
- Verify product images.
- Validate product details.
- Sort products alphabetically (A–Z).
- Sort products in reverse alphabetical order (Z–A).
- Sort products by price (Low to High).
- Sort products by price (High to Low).
- Add single or multiple products to the cart.
- Remove products from the catalogue.

### 3. Shopping Cart Testing

- Verify cart contents.
- Validate product quantities.
- Remove products from the cart.
- Continue shopping.
- Verify cart persistence during navigation.
- Verify cart behavior after page reload.
- Validate empty cart behavior.

### 4. Checkout Testing

- Complete a successful checkout.
- Verify order confirmation.
- Validate item totals.
- Verify tax calculations.
- Verify final order total.
- Validate required customer information.
- Submit checkout with empty fields.
- Cancel checkout and return to the cart.
- Verify cart is emptied after successful order completion.

### 5. Network Testing

- Intercept image asset requests using `cy.intercept()`.
- Verify application behavior when image requests fail.
- Stub image requests with HTTP 404 responses.
- Verify that third-party telemetry failures do not break core application functionality.

*Note: Test scenarios listed above describe the intended coverage and should be kept in sync with the actual implemented test cases.*

---

## Test Reporting

The project uses **cypress-mochawesome-reporter** to generate detailed HTML test reports.

The reporter is configured with:

- HTML test reports.
- Test execution statistics.
- Passed and failed test cases.
- Execution duration.
- Embedded screenshots.
- Report charts.

### Report Location

```text
cypress/reports/
```

### Generate Markdown Execution Summary

```bash
npm run report:summary
```

The custom reporting script:

- Reads Mochawesome JSON reports.
- Calculates total tests, passed tests, failures, pending tests, and duration.
- Lists failed test cases.
- Generates a Markdown summary.
- Appends the summary to the GitHub Actions job summary when running in CI.

---

## Screenshots and Videos

Cypress is configured to capture screenshots and videos during test execution.

| Artifact | Location |
|---|---|
| Failure Screenshots | `cypress/screenshots/` |
| Test Execution Videos | `cypress/videos/` |
| HTML Reports | `cypress/reports/` |

Configuration:

- Screenshots are captured when tests fail.
- Video recording is enabled.
- Previous test assets are removed before each run.

---

## CI/CD Pipeline – GitHub Actions

The project integrates with **GitHub Actions** to automate test execution.

The workflow is triggered automatically on:

- Push events.
- Pull requests.
- Manual workflow dispatch.

### Pipeline Workflow

1. Checks out the repository.
2. Sets up Node.js 20.
3. Installs dependencies.
4. Executes Cypress E2E tests.
5. Runs tests across Chrome and Firefox using a browser matrix.
6. Generates a Markdown test execution summary.
7. Uploads test reports as GitHub Actions artifacts.
8. Uploads failure screenshots when tests fail.
9. Uploads execution videos.

### Browser Matrix

| Browser | Execution |
|---|---|
| Google Chrome | Automated CI execution |
| Mozilla Firefox | Automated CI execution |
| Microsoft Edge | Available for local execution |

The workflow uses `cypress-io/github-action@v6` and runs browser jobs in parallel with `fail-fast: false`.

---

## Known Application Limitations

Sauce Demo is a public demo application with certain technical limitations that influence the test strategy.

### 1. Deep-Link Navigation

Deep links may return HTTP 404 responses because the application is served as a client-side single-page application.

Therefore:

- Tests navigate to the application through its root URL.
- Login is performed through the UI.
- Protected-route behavior is tested separately.
- `failOnStatusCode: false` is used only where necessary to validate the expected deep-link behavior.

### 2. Checkout Validation

The application primarily checks whether required checkout fields are populated.

It does not provide comprehensive validation for all possible input formats.

Therefore, negative checkout scenarios focus on missing or empty required fields.

### 3. API Testing Limitations

The demo application does not expose a dedicated business REST API for the core purchase workflow.

Network testing therefore focuses on intercepted asset requests and third-party traffic using Cypress `cy.intercept()`.

---

## Execution Evidence

Actual execution results should be recorded after running the test suite.

Run:

```bash
npm install
npm test
npm run report:summary
```

Update the following table using the generated report:

| Date | Browser | Total | Passed | Failed | Skipped |
|---|---|---:|---:|---:|---:|
| To be updated | Chrome | - | - | - | - |
| To be updated | Firefox | - | - | - | - |

Add a screenshot of the generated HTML report to demonstrate the actual test execution results.

---

## Future Improvements

- Expand test coverage for additional edge cases.
- Integrate automated API testing when a suitable API is available.
- Add visual regression testing.
- Improve test data management.
- Integrate test result notifications.
- Extend CI browser coverage.

---

## Author

**Rwnaa Osama**

Software Engineering Graduate | QA & Test Automation

GitHub: https://github.com/r123-prog

---

*Developed as a practical Software Testing and Test Automation project to demonstrate Cypress E2E automation, test design, reporting, and CI/CD integration.*
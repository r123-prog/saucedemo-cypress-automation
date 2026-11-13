# SauceDemo E2E Test Automation

[![Cypress E2E Tests](https://github.com/r123-prog/saucedemo-cypress-automation/actions/workflows/cypress.yml/badge.svg?branch=main)](https://github.com/r123-prog/saucedemo-cypress-automation/actions/workflows/cypress.yml)

An end-to-end (E2E) test automation project for the [SauceDemo](https://www.saucedemo.com/) e-commerce demo application, built with **Cypress 14.5.4, JavaScript, and Node.js**.

The framework covers key shopping journeys—authentication, product catalogue, cart, checkout, and selected network scenarios—and runs automatically in **Google Chrome and Mozilla Firefox** through GitHub Actions.

## Project Highlights

- Automated UI testing with Cypress and JavaScript.
- Page Object Model with reusable page classes.
- Reusable custom Cypress commands, selectors, and fixture-based test data.
- Cross-browser execution on Chrome and Firefox in CI.
- Mochawesome HTML and JSON test reporting.
- GitHub Actions workflow with downloadable reports and execution videos.
- Failure screenshots uploaded when a CI job fails.

## Tech Stack

| Category | Tools |
|---|---|
| Language | JavaScript |
| Runtime | Node.js 20 in CI (project requires Node.js 18+) |
| Test Automation | Cypress 14.5.4 |
| Test Reporter | cypress-mochawesome-reporter |
| Browsers in CI | Google Chrome, Mozilla Firefox |
| CI/CD | GitHub Actions |
| Version Control | Git, GitHub |

## Test Coverage

The current E2E suite contains **34 test cases** across five areas.

| Area | Coverage | Test IDs |
|---|---|---|
| Authentication | Valid and invalid login, required fields, locked-out user | AUTH-001–AUTH-007 |
| Product Catalogue | Product details, sorting, add/remove products | PROD-001–PROD-009 |
| Shopping Cart | Cart contents, quantities, remove item, navigation and persistence | CART-001–CART-007 |
| Checkout | Successful order, totals, required fields, cancel flow, cart reset | CHK-001–CHK-008 |
| Network | Product asset requests, failed image requests, telemetry failure handling | NET-001–NET-003 |

### Key Scenarios

**Authentication**
- Sign in with valid credentials.
- Reject invalid username and password combinations.
- Validate empty and missing login fields.
- Prevent login for a locked-out user.

**Product Catalogue**
- Verify product names, prices, descriptions, images, and add-to-cart controls.
- Open and verify product details.
- Sort products by name and price in both directions.
- Add one or multiple products to the cart and remove products.

**Shopping Cart**
- Verify selected products and quantities.
- Remove an item and verify the remaining cart contents.
- Continue shopping while preserving cart contents.
- Verify cart persistence after reload and navigation.
- Verify the empty-cart state.

**Checkout**
- Complete an order and verify the confirmation.
- Validate item subtotal, tax, and final total.
- Verify required first name, last name, and postal code.
- Cancel checkout and return to the cart.
- Verify the cart is empty after a successful order.

**Network**
- Observe product asset requests and verify images load.
- Stub product image requests with HTTP 404 responses and verify the catalogue remains usable.
- Simulate a third-party telemetry failure and verify the main login flow remains usable.

## Project Structure

```text
saucedemo-cypress-automation/
├── .github/
│   └── workflows/
│       └── cypress.yml
├── cypress/
│   ├── e2e/
│   │   ├── auth/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── network/
│   ├── fixtures/
│   ├── pages/
│   ├── support/
│   ├── reports/
│   ├── screenshots/
│   └── videos/
├── scripts/
│   └── report-summary.js
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

- **e2e/** contains the Cypress test specifications grouped by feature.
- **fixtures/** stores reusable test data.
- **pages/** contains page objects and page-level actions/assertions.
- **support/** contains shared Cypress support code, selectors, and utilities.
- **scripts/report-summary.js** creates a Markdown summary from Mochawesome JSON results.

## Getting Started

### Prerequisites

- Node.js 18 or newer.
- npm.
- Git.
- Google Chrome and/or Mozilla Firefox for local cross-browser runs.

### 1. Clone the repository

```bash
git clone https://github.com/r123-prog/saucedemo-cypress-automation.git
cd saucedemo-cypress-automation
```

### 2. Install dependencies

```bash
npm install
```

## Run Tests

### Open Cypress Test Runner

```bash
npm run cy:open
```

### Run the complete suite headlessly

```bash
npm test
```

### Run in a specific browser

```bash
npm run test:chrome
npm run test:firefox
```

The project also defines an Edge script for local use:

```bash
npm run test:edge
```

### Run with a visible Chrome browser

```bash
npm run test:headed
```

### Run a specific feature suite

```bash
npm run test:auth
npm run test:products
npm run test:cart
npm run test:checkout
npm run test:network
```

### Clean generated test assets

```bash
npm run clean
```

## Test Data and Configuration

The Cypress configuration uses the SauceDemo application URL:

```text
https://www.saucedemo.com
```

Demo credentials are configured as Cypress environment values:

| User | Username | Password |
|---|---|---|
| Standard user | `standard_user` | `secret_sauce` |
| Locked-out user | `locked_out_user` | `secret_sauce` |

These are public test credentials for the SauceDemo demo application. Do not use real or personal credentials in test fixtures or source control.

## Reporting and Test Evidence

The project uses **cypress-mochawesome-reporter** to generate HTML and JSON reports.

Generated report files are stored in:

```text
cypress/reports/
```

The report includes execution statistics and test details. The reporter is configured to include charts and embedded screenshots.

Generate a Markdown execution summary with:

```bash
npm run report:summary
```

The summary script reads the generated Mochawesome JSON report, totals tests/passes/failures/pending tests and duration, lists failures when present, and appends the summary to the GitHub Actions job summary when running in CI.

### Screenshots and Videos

| Evidence | Location |
|---|---|
| HTML and JSON reports | `cypress/reports/` |
| Failure screenshots | `cypress/screenshots/` |
| Test run videos | `cypress/videos/` |

Cypress video recording and failure screenshots are enabled in the project configuration.

## Continuous Integration – GitHub Actions

The workflow is defined in `.github/workflows/cypress.yml` and runs on:

- Pushes.
- Pull requests.
- Manual `workflow_dispatch` triggers.

### Pipeline Steps

1. Check out the repository.
2. Set up Node.js 20.
3. Install npm dependencies.
4. Run the Cypress suite using a browser matrix.
5. Execute Chrome and Firefox jobs independently.
6. Publish the test summary to the GitHub Actions run.
7. Upload report artifacts.
8. Upload failure screenshots when a job fails.
9. Upload test videos.

The browser matrix uses `fail-fast: false`, so one browser job can finish even if the other fails.

### Latest CI Results

See the [GitHub Actions workflow runs](https://github.com/r123-prog/saucedemo-cypress-automation/actions/workflows/cypress.yml) for the latest execution status and downloadable artifacts.

Each successful browser job uploads its own report artifact. Download and extract the artifact to view the generated HTML report locally.

## Useful Links

- **Repository:** https://github.com/r123-prog/saucedemo-cypress-automation
- **GitHub Actions:** https://github.com/r123-prog/saucedemo-cypress-automation/actions
- **Application under test:** https://www.saucedemo.com/

## Author

**Rwnaa Osama**  
Software Engineering Graduate | Software Testing & QA Automation

- GitHub: [@r123-prog](https://github.com/r123-prog)

---

*This project was developed to demonstrate practical skills in E2E test automation, test design, reusable test architecture, cross-browser testing, reporting, and CI/CD.*

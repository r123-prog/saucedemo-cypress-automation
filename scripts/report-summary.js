
/**
 * Prints a Markdown summary of Cypress Mochawesome results
 * and appends it to GitHub Actions job summary when available.
 */

const fs = require('fs');
const path = require('path');

const reportsDir = path.join('cypress', 'reports');
const jsonDir = path.join(reportsDir, '.jsons');
const mergedJson = path.join(reportsDir, 'index.json');

const totals = {
  tests: 0,
  passes: 0,
  failures: 0,
  pending: 0,
  duration: 0,
};

const failed = [];

const collect = (suite) => {
  (suite.tests || []).forEach((test) => {
    if (test.fail) {
      failed.push({
        title: test.fullTitle,
        message: (test.err && test.err.message) || '',
      });
    }
  });

  (suite.suites || []).forEach(collect);
};

let reportFiles = [];

if (fs.existsSync(jsonDir)) {
  reportFiles = fs.readdirSync(jsonDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => path.join(jsonDir, file));
}

if (reportFiles.length === 0 && fs.existsSync(mergedJson)) {
  reportFiles = [mergedJson];
}

if (reportFiles.length === 0) {
  console.log('No Mochawesome JSON report found.');
  process.exit(0);
}

reportFiles.forEach((file) => {
  const report = JSON.parse(fs.readFileSync(file, 'utf8'));
  const stats = report.stats || {};

  Object.keys(totals).forEach((key) => {
    totals[key] += stats[key] || 0;
  });

  (report.results || []).forEach(collect);
});

const lines = [
  '## Cypress Test Summary',
  '',
  '| Total | Passed | Failed | Pending | Duration |',
  '| ----: | -----: | -----: | ------: | -------: |',
  `| ${totals.tests} | ${totals.passes} | ${totals.failures} | ${totals.pending} | ${(totals.duration / 1000).toFixed(1)}s |`,
];

if (failed.length > 0) {
  lines.push(
    '',
    '### Failures',
    ...failed.map(
      (test) =>
        `- **${test.title}**: ${test.message.split('\n')[0]}`
    )
  );
}

const output = lines.join('\n');

console.log(output);

if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    `${output}\n`
  );
}
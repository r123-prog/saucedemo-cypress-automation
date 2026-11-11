/**
 * Prints a Markdown summary of the Mochawesome JSON results and, when running in
 * GitHub Actions, appends it to the job summary. Exits 0 even if no report exists.
 */
const fs = require('fs');
const path = require('path');

const dir = path.join('cypress', 'reports', '.jsons');
if (!fs.existsSync(dir)) {
  console.log(`No Mochawesome JSON found in ${dir}`);
  process.exit(0);
}

const totals = { tests: 0, passes: 0, failures: 0, pending: 0, duration: 0 };
const failed = [];

const collect = (suite) => {
  (suite.tests || []).forEach((t) => t.fail && failed.push({ title: t.fullTitle, message: (t.err && t.err.message) || '' }));
  (suite.suites || []).forEach(collect);
};

fs.readdirSync(dir)
  .filter((f) => f.endsWith('.json'))
  .forEach((file) => {
    const report = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    const s = report.stats || {};
    Object.keys(totals).forEach((k) => (totals[k] += s[k] || 0));
    (report.results || []).forEach(collect);
  });

const lines = [
  '## Cypress test summary',
  '',
  '| Total | Passed | Failed | Skipped | Duration |',
  '| ----: | -----: | -----: | ------: | -------: |',
  `| ${totals.tests} | ${totals.passes} | ${totals.failures} | ${totals.pending} | ${(totals.duration / 1000).toFixed(1)}s |`,
];
if (failed.length) {
  lines.push('', '### Failures', ...failed.map((f) => `- **${f.title}**: ${f.message.split('\n')[0]}`));
}

const output = lines.join('\n');
console.log(output);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${output}\n`);

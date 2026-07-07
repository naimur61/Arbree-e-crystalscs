/**
 * Custom ESLint formatter — relative paths, compact, readable.
 * Usage: npx eslint src/ --format ./scripts/eslint-formatter-relative.cjs
 */
const path = require('path');
const cwd = process.cwd();

module.exports = function (results) {
  let output = '';
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const file of results) {
    if (file.messages.length === 0) continue;

    const relativePath = path.relative(cwd, file.filePath);
    output += `\n${relativePath}\n`;

    for (const msg of file.messages) {
      if (msg.severity === 2) totalErrors++;
      if (msg.severity === 1) totalWarnings++;

      const type = msg.severity === 2 ? 'error' : 'warning';
      const rule = msg.ruleId ? `  [${msg.ruleId}]` : '';
      const firstLine = msg.message.split('\n')[0];
      output += `  ${msg.line}:${msg.column}  ${type}  ${firstLine}${rule}\n`;
    }
  }

  const total = totalErrors + totalWarnings;
  if (total > 0) {
    output += `\n✖ ${total} problem${total !== 1 ? 's' : ''} (${totalErrors} error${totalErrors !== 1 ? 's' : ''}, ${totalWarnings} warning${totalWarnings !== 1 ? 's' : ''})\n`;
  }

  return output;
};

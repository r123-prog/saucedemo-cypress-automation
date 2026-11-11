/** Extracts the first money amount from text such as "Item total: $29.99" -> 29.99 */
export const parseCurrency = (text) => {
  const match = String(text).match(/\$?(\d+(?:\.\d{1,2})?)/);
  if (!match) throw new Error(`No currency amount found in "${text}"`);
  return Number(match[1]);
};

/** Rounds to cents to avoid floating point noise in totals. */
export const roundCents = (value) => Math.round(value * 100) / 100;

/** True when `values` are sorted in the given direction ('asc' | 'desc'). */
export const isSorted = (values, direction = 'asc') =>
  values.every((value, i) => {
    if (i === 0) return true;
    const prev = values[i - 1];
    const cmp = typeof value === 'string' ? prev.localeCompare(value) : prev - value;
    return direction === 'asc' ? cmp <= 0 : cmp >= 0;
  });

/**
 * Changes camelCase strings to kebab-case, replaces spaces with dash and keeps underscores.
 * @param str
 * @returns formated string
 * @description normalizes input to supported path and file name format.
 */
export function normalizeToKebabOrSnakeCase(str: string) {
  const STRING_DASHERIZE_REGEXP = /\s/g;
  const STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g;
  return str
    ?.trim()
    ?.replace(STRING_DECAMELIZE_REGEXP, '$1-$2')
    ?.toLowerCase()
    ?.replace(STRING_DASHERIZE_REGEXP, '-');
}

export function constantCase(input: string): string {
  if (!input) {
    return '';
  }
  return input
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toUpperCase();
}

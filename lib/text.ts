/**
 * True when a string holds something other than whitespace. The blocks in
 * `components/site/` use it to leave an element out instead of rendering it
 * empty (a heading with no text, a link with no label, a term with no value).
 */
export function hasText(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

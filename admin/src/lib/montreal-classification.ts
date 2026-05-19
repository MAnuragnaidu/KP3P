/** Extract Montreal code (A1, L1, B1, P) from a known radio label value only. */
export function extractMontrealCode(value: string): string | null {
  const t = value.trim();
  if (!t || t === 'No') return null;

  const parenMatch = t.match(/^([ABLP]\d*)\s*\(/);
  if (parenMatch) return parenMatch[1];

  const dashMatch = t.match(/^([ABL]\d+)-/i);
  if (dashMatch) return dashMatch[1].toUpperCase();

  if (t === 'P (Yes)') return 'P';

  if (/^[ABLP]\d+$/.test(t)) return t;

  return null;
}

export function hasMontrealSelections(fields: MontrealFieldValues): boolean {
  return [
    fields.montrealAgeAtDiagnosis,
    fields.diseaseLocation,
    fields.diseaseBehavior,
    fields.perianalDisease,
  ].some((v) => typeof v === 'string' && v.trim() !== '');
}

export type MontrealFieldValues = {
  montrealAgeAtDiagnosis?: unknown;
  diseaseLocation?: unknown;
  diseaseBehavior?: unknown;
  perianalDisease?: unknown;
};

/** Build display string e.g. "A1 - L1 - B1" (and "P" when perianal is yes). */
export function composeMontrealClass(fields: MontrealFieldValues): string {
  if (!hasMontrealSelections(fields)) return '';

  const codes: string[] = [];

  const age = extractMontrealCode(String(fields.montrealAgeAtDiagnosis ?? ''));
  const location = extractMontrealCode(String(fields.diseaseLocation ?? ''));
  const behavior = extractMontrealCode(String(fields.diseaseBehavior ?? ''));
  const perianal = extractMontrealCode(String(fields.perianalDisease ?? ''));

  if (age) codes.push(age);
  if (location) codes.push(location);
  if (behavior) codes.push(behavior);
  if (perianal) codes.push(perianal);

  return codes.join(' - ');
}

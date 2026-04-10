export function nowIso(): string {
  return new Date().toISOString();
}

export function getRelativeMsFromMinutes(minutes: number): number {
  return minutes * 60 * 1000;
}

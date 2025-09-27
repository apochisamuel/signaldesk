type FailureRule = { key: string; remaining: number; message: string };

let extraDelayMs = 0;
let failureRules: FailureRule[] = [];
let sequence = 0;

export function nextRequestId(prefix: string): string {
  sequence += 1;
  return `${prefix}-${sequence}`;
}

export function networkDelay(key: string): Promise<void> {
  const hash = [...key].reduce((total, char) => total + char.charCodeAt(0), 0);
  const delay = 35 + (hash % 5) * 25 + extraDelayMs;
  return new Promise((resolve) => window.setTimeout(resolve, delay));
}

export function consumeFailure(key: string): void {
  const index = failureRules.findIndex((rule) => rule.key === key && rule.remaining > 0);
  if (index < 0) return;
  const rule = failureRules[index];
  rule.remaining -= 1;
  throw new Error(rule.message);
}

export function configureMockNetwork(options: { extraDelayMs?: number; fail?: FailureRule[] }): void {
  extraDelayMs = options.extraDelayMs ?? 0;
  failureRules = (options.fail ?? []).map((rule) => ({ ...rule }));
}

export function resetMockNetwork(): void {
  extraDelayMs = 0;
  failureRules = [];
  sequence = 0;
}

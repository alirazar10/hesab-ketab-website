/**
 * The worked example shown on the page: one electricity bill split by each unit's consumption.
 * The numbers are chosen so every share is a whole number of afghani (20 AFN per kWh) and the
 * shares add up to the bill exactly. The resident card uses the same household (unit 2).
 */
export const exampleBill = 22000;

export const exampleUnits = [
  { unit: 1, name: "rahimi", kwh: 245 },
  { unit: 2, name: "ahmadi", kwh: 310 },
  { unit: 3, name: "nouri", kwh: 180 },
  { unit: 4, name: "haidari", kwh: 365 },
] as const;

export const exampleKwh = exampleUnits.reduce((sum, u) => sum + u.kwh, 0);

export const shareOf = (kwh: number) => (exampleBill * kwh) / exampleKwh;

/** Latin digits with thousands separators, as in the app: 22,000. */
export const num = (n: number, digits = 0) =>
  n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });

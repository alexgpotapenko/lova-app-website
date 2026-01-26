const pollenTypes = ["birch", "hazel", "grass", "alder", "ash"];

const pollenMeta = {
  birch: {
    labelKey: "dashboard.pollen.birch",
    base: 35,
    amplitude: 45,
    thresholds: { low: 20, medium: 60, high: 120 },
  },
  hazel: {
    labelKey: "dashboard.pollen.hazel",
    base: 22,
    amplitude: 32,
    thresholds: { low: 12, medium: 35, high: 80 },
  },
  grass: {
    labelKey: "dashboard.pollen.grass",
    base: 25,
    amplitude: 35,
    thresholds: { low: 15, medium: 45, high: 90 },
  },
  alder: {
    labelKey: "dashboard.pollen.alder",
    base: 28,
    amplitude: 38,
    thresholds: { low: 14, medium: 40, high: 95 },
  },
  ash: {
    labelKey: "dashboard.pollen.ash",
    base: 20,
    amplitude: 30,
    thresholds: { low: 12, medium: 34, high: 75 },
  },
};

const rangeConfigs = {
  today: { hours: 24, stepHours: 1, labelKey: "dashboard.controls.today" },
  yesterday: { hours: 24, stepHours: 1, labelKey: "dashboard.controls.yesterday" },
  last7: { hours: 24 * 7, stepHours: 1, labelKey: "dashboard.controls.last7" },
  season: { hours: 24 * 120, stepHours: 24, labelKey: "dashboard.controls.season" },
};

const cityAreaBias = {
  zurich: { center: 5, north: 12, lake: -4 },
  basel: { center: 3 },
  geneva: { center: 6, west: -2 },
};

const hashSeed = (value) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const buildSeries = ({ seed, points, stepHours, base, amplitude, bias }) => {
  const now = new Date();
  const start = new Date(now.getTime() - (points - 1) * stepHours * 3600 * 1000);
  const timestamps = [];
  const values = [];
  const lower = [];
  const upper = [];

  for (let i = 0; i < points; i += 1) {
    const date = new Date(start.getTime() + i * stepHours * 3600 * 1000);
    const random = seededRandom(seed + i * 7.13);
    const seasonal = Math.sin((i / points) * Math.PI * 2) * amplitude;
    const noise = (random - 0.5) * amplitude * 0.4;
    const trend = (i / points) * amplitude * 0.12;
    const value = Math.max(0, base + bias + seasonal + noise + trend);
    const band = Math.max(6, value * 0.2);

    timestamps.push(date);
    values.push(Math.round(value));
    lower.push(Math.max(0, Math.round(value - band)));
    upper.push(Math.round(value + band));
  }

  return { timestamps, values, lower, upper };
};

export const getMockDashboardData = ({ city, area, pollen, range }) => {
  const pollenConfig = pollenMeta[pollen] || pollenMeta.birch;
  const rangeConfig = rangeConfigs[range] || rangeConfigs.today;
  const bias = cityAreaBias[city]?.[area] ?? 0;

  const seed = hashSeed(`${city}-${area}-${pollen}-${range}`);
  const points = Math.floor(rangeConfig.hours / rangeConfig.stepHours);

  const series = buildSeries({
    seed,
    points,
    stepHours: rangeConfig.stepHours,
    base: pollenConfig.base,
    amplitude: pollenConfig.amplitude,
    bias,
  });

  return {
    series,
    thresholds: pollenConfig.thresholds,
    labelKey: pollenConfig.labelKey,
    rangeLabelKey: rangeConfig.labelKey,
  };
};

export const pollenTypeOptions = pollenTypes;
export const rangeOptions = Object.keys(rangeConfigs);

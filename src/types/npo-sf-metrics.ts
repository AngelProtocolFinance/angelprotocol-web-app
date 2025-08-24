export interface IPerfPoint {
  date: string;
  perf: number;
  invested: number;
}

export interface INpoMetrics {
  points: IPerfPoint[];
  total_return: number;
}

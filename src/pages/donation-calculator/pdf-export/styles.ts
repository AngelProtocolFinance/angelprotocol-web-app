import { StyleSheet } from "@react-pdf/renderer";

export const blue = {
  d7: "#050c1a",
  d6: "#0d1e30",
  d5: "#112840",
  d4: "#1a3f60",
  d3: "#194b73",
  d2: "#1a578a",
  d1: "#1e6dab",
  d: "#2d89c8",
  l1: "#54a5dc",
  l2: "#8fc4ea",
  l3: "#c4def3",
  l4: "#e4effa",
  l5: "#f2f8fd",
};

export const green = {
  d5: "#022c22",
  d4: "#064e3b",
  d3: "#065f46",
  d2: "#047857",
  d1: "#059669",
  d: "#10b981",
  l1: "#34d399",
  l2: "#6ee7b7",
  l3: "#a7f3d0",
  l4: "#d1fae5",
  l5: "#ecfdf5",
};

export const amber = {
  d5: "#451a03",
  d4: "#78350f",
  d3: "#92400e",
  d2: "#b45309",
  d1: "#d97706",
  d: "#f59e0b",
  l1: "#fbbf24",
  l2: "#fcd34d",
  l3: "#fde68a",
  l4: "#fef3c7",
  l5: "#fffbeb",
};

export const gray = {
  d5: "#020617",
  d4: "#0f172a",
  d3: "#1e293b",
  d2: "#334155",
  d1: "#475569",
  d: "#64748b",
  l1: "#94a3b8",
  l2: "#cbd5e1",
  l3: "#e2e8f0",
  l4: "#f1f5f9",
  l5: "#f8fafc",
  l6: "#fff",
};

export const fs = {
  sm: 9,
  base: 10,
  lg: 14,
  xl: 20,
} as const;

export const w = {
  "2": 2,
  "4": 4,
  "6": 6,
  "10": 10,
  "14": 14,
  "20": 20,
} as const;

export const fw = {
  l: 300, // light
  m: 500, // medium
  n: 400, // normal
  sb: 600, // semibold
  b: 700, // bold
} as const;

export const styles = StyleSheet.create({
  doc: {
    fontFamily: "Quicksand",
  },
  section: {
    padding: w["10"],
  },
  header: {
    backgroundColor: blue.d,
    color: "white",
  },
  kv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
});

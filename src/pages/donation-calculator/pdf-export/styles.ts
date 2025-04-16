import { StyleSheet } from "@react-pdf/renderer";

export const blue = {
  d7: "#050c1a",
  d6: "#0d1e30",
  d5: "#112840",
  d4: "#1a3f60",
  d3: "#194b73",
  d2: "#1a578a",
  d1: "#1e6dab",
  _: "#2d89c8",
  l1: "#54a5dc",
  l2: "#8fc4ea",
  l3: "#c4def3",
  l4: "#e4effa",
  l5: "#f2f8fd",
};

export const spc = {
  _0: 0,
  px: 1,
  _0_5: 2,
  _1: 4,
  _1_5: 6,
  _2: 8,
  _2_5: 10,
  _3: 12,
  _3_5: 14,
  _4: 16,
  _5: 20,
  _6: 24,
  _7: 28,
  _8: 32,
  _9: 36,
  _10: 40,
  _11: 44,
  _12: 48,
  _14: 56,
  _16: 64,
  _20: 80,
  _24: 96,
  _28: 112,
  _32: 128,
  _36: 144,
  _40: 160,
  _44: 176,
  _48: 192,
  _52: 208,
  _56: 224,
  _60: 240,
  _64: 256,
  _72: 288,
  _80: 320,
  _96: 384,
} as const;

/** font-size */
export const fs = {
  dxs: 10,
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
  "6xl": 60,
  "7xl": 72,
  "8xl": 96,
  "9xl": 128,
};

export const styles = StyleSheet.create({
  doc: {
    fontFamily: "Quicksand",
  },
  page: {},
  section: {
    padding: spc._3,
  },
  header: {
    backgroundColor: blue._,
    color: "white",
  },
});

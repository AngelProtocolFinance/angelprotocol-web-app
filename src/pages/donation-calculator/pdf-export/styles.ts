import { StyleSheet } from "@react-pdf/renderer";

export const blue = "#2d89c8";
export const green = "#4caf50";

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
    backgroundColor: blue,
    color: "white",
  },
  kv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
});

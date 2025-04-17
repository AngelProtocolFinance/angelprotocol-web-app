import { StyleSheet } from "@react-pdf/renderer";

export const blue = "#2d89c8";
export const green = "#4caf50";

export const pd = {
  l1: 10,
  l2: 14,
  l3: 20,
} as const;

export const fs = {
  sm: 9,
  base: 10,
  xl: 14,
  "2xl": 20,
} as const;

export const spc = {
  "2": 2,
  "4": 4,
  "10": 10,
  "14": 14,
  "20": 20,
  "-4": -4,
  "-10": -10,
  "-20": -20,
  "-35": -35,
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
    padding: spc["10"],
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

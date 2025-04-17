import { StyleSheet } from "@react-pdf/renderer";

export const blue = "#2d89c8";
export const green = "#4caf50";

export const pd = {
  l1: 10,
  l2: 14,
  l3: 20,
  l4: 24,
} as const;

export const styles = StyleSheet.create({
  doc: {
    fontFamily: "Quicksand",
  },
  section: {
    padding: 10,
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

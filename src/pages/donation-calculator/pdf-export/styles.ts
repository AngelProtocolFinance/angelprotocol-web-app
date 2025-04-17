import { StyleSheet } from "@react-pdf/renderer";

export const blue = "#2d89c8";

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

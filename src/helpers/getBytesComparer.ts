//used in schemas where string size must be compared
export default function getBytesComparer(
  comparison: "gt" | "lt",
  num_bytes: number
) {
  return function (str?: string) {
    if (comparison === "gt") {
      return new Blob([str || ""]).size > num_bytes;
    } else {
      return new Blob([str || ""]).size <= num_bytes;
    }
  };
}

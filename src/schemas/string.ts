import { string } from "yup";
import { testAddress } from "./tests";

export const address = (title: string) =>
  string().test(
    "is valid",
    `${title} address format is not valid`,
    testAddress
  );

export const requiredAddress = (title: string) =>
  string()
    .required(`${title} address is required`)
    .test("is valid", `${title} address format is not valid`, testAddress);

export const stringByteSchema = (
  title: string,
  minBytes: number,
  maxBytes: number
) =>
  string()
    .required(`${title} is required`)
    .test(
      "min_length",
      `${title} must be at least ${minBytes} bytes`,
      getBytesComparer("gt", minBytes)
    )
    .test(
      "max_length",
      `title must be less than ${maxBytes} bytes `,
      getBytesComparer("lt", maxBytes)
    );

function getBytesComparer(comparison: "gt" | "lt", num_bytes: number) {
  return function (str?: string) {
    if (comparison === "gt") {
      return new Blob([str || ""]).size > num_bytes;
    } else {
      return new Blob([str || ""]).size <= num_bytes;
    }
  };
}

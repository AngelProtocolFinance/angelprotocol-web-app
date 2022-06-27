import * as Yup from "yup";
import { testAddress, testContractAddr } from "./tests";

export const address = (title: string) =>
  Yup.string().test(
    "is valid",
    `${title} address format is not valid`,
    testAddress
  );

export const contractAddr = (title: string) =>
  Yup.string().test(
    "is valid",
    `${title} address format is not valid`,
    testContractAddr
  );

export const requiredAddress = (title: string) =>
  Yup.string()
    .required(`${title} address is required`)
    .test("is valid", `${title} address format is not valid`, testAddress);

export const requiredContractAddr = (title: string) =>
  Yup.string()
    .required(`${title} address is required`)
    .test("is valid", `${title} address format is not valid`, testContractAddr);

export const url = Yup.string().url("invalid url").nullable();

export const stringByteSchema = (
  title: string,
  minBytes: number,
  maxBytes: number
) =>
  Yup.string()
    .required(`${title} is required`)
    .test(
      "min_length",
      `${title} is too short`,
      getBytesComparer("gt", minBytes)
    )
    .test(
      "max_length",
      `${title} is too long`,
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

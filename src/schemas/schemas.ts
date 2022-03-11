import * as Yup from "yup";

export const addressSchema = (title: string) =>
  Yup.string()
    .required(`${title} address is required`)
    .test("is valid", `${title} address format is not valid`, (address) =>
      /^terra[a-z0-9]{39}$/i.test(address as string)
    );

export const stringByteSchema = (
  title: string,
  minBytes: number,
  maxBytes: number
) =>
  Yup.string()
    .required(`${title} is required`)
    .test(
      "min_length",
      `${title} must be atleast ${minBytes} bytes`,
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

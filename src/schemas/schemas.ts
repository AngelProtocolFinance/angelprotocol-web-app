import * as Yup from "yup";

export const addressSchema = (title: string) =>
  Yup.string()
    .required(`${title} address is required`)
    .test("is valid", `${title} address format is not valid`, (address) =>
      /^terra[a-z0-9]{39}$/i.test(address as string)
    );

export const stringByteSchema = (title: string, min: number, max: number) =>
  Yup.string()
    .required(`${title} is required`)
    .test(
      "min_length",
      `${title} must be atleast ${min} bytes`,
      getBytesComparer("gt", min)
    )
    .test(
      "max_length",
      `title must be less than ${max} bytes `,
      getBytesComparer("lt", max)
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

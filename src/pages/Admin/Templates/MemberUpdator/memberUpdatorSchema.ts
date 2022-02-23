import getBytesComparer from "helpers/getBytesComparer";
import { PartialRecord } from "types/types";
import * as Yup from "yup";

export const max_title_bytes = 64;
export const max_desc_bytes = 1024;

export type MemberUpdatorValues = {
  addr: string;
  weight: string;
  title: string;
  description: string;
};
const memberUpdateShape: PartialRecord<
  keyof MemberUpdatorValues,
  Yup.AnySchema
> = {
  addr: Yup.string()
    .required("wallet address is required")
    .test("is valid", "wallet address format is not valid", (address) =>
      /^terra[a-z0-9]{39}$/i.test(address as string)
    ),
  weight: Yup.number()
    .required("weight is required")
    .typeError("weight must be a number"),

  title: Yup.string()
    .required("title is required")
    .test(
      "min_length",
      "title must be atleast 4 bytes",
      getBytesComparer("gt", 4)
    )
    .test(
      "max_length",
      `title must be less than ${max_title_bytes} bytes `,
      getBytesComparer("lt", max_title_bytes)
    ),
  description: Yup.string()
    .required("description is required")
    .test(
      "min_length",
      "description must be atleast 4 bytes",
      getBytesComparer("gt", 4)
    )
    .test(
      "max_length",
      `description must be less than ${max_desc_bytes} bytes `,
      getBytesComparer("lt", max_desc_bytes)
    ),
};

export const memberUpdatorSchema = Yup.object(memberUpdateShape);

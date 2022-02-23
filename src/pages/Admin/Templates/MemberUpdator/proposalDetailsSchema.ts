import getBytesComparer from "helpers/getBytesComparer";
import { PartialRecord } from "types/types";
import * as Yup from "yup";

export type ProposalDetailsType = {
  title: string;
  description: string;
};

export const max_title_bytes = 64;
export const max_desc_bytes = 1024;
const schemaShape: PartialRecord<keyof ProposalDetailsType, Yup.AnySchema> = {
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
  //amount: pre-set and disabled
};

export const schema = Yup.object(schemaShape);

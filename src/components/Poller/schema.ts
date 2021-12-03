import * as Yup from "yup";

export const max_title_bytes = 64;
export const max_link_bytes = 128;
export const max_desc_bytes = 1024;

export const schema = Yup.object().shape({
  title: Yup.string()
    .required("title is required")
    .test("min_length", "title must be atleast 4 bytes", comp_bytes(true, 4))
    .test(
      "max_length",
      `title must be less than ${max_title_bytes} bytes `,
      comp_bytes(false, max_title_bytes)
    ),
  description: Yup.string()
    .required("description is required")
    .test(
      "min_length",
      "description must be atleast 4 bytes",
      comp_bytes(true, 4)
    )
    .test(
      "max_length",
      `description must be less than ${max_desc_bytes} bytes `,
      comp_bytes(false, max_desc_bytes)
    ),
  link: Yup.string()
    .required("link required")
    .test("min_length", "url must be atleast 4 bytes", comp_bytes(true, 4))
    .url("url is invalid")
    .test(
      "max_length",
      `url must be less than ${max_link_bytes} bytes `,
      comp_bytes(false, max_link_bytes)
    ),
  //amount: pre-set and disabled
});

function comp_bytes(is_gt: boolean, num_bytes: number) {
  return function (str?: string) {
    if (is_gt) {
      return new Blob([str || ""]).size > num_bytes;
    } else {
      return new Blob([str || ""]).size <= num_bytes;
    }
  };
}

import * as Yup from "yup";

export const schema = Yup.object().shape({
  title: Yup.string()
    .required("title is required")
    .test("min_length", "title must be atleast 4 bytes", comp_bytes(true, 4))
    .test(
      "max_length",
      "title must be less than 64 bytes ",
      comp_bytes(false, 64)
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
      "description must be less than 1024 bytes ",
      comp_bytes(false, 1024)
    ),
  link: Yup.string()
    .required("link required")
    .test("min_length", "url must be atleast 4 bytes", comp_bytes(true, 4))
    .url("url is invalid")
    .test(
      "max_length",
      "url must be less than 128 bytes ",
      comp_bytes(false, 128)
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

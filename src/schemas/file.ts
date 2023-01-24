import * as Yup from "yup";

export const genFileSchema = (size: number, types: string[]) =>
  Yup.mixed<File>()
    .test({
      name: "must be of correct type",
      message: "invalid file type",
      test: (file) => (file ? types.includes(file.type) : true),
    })
    .test({
      name: "must be less than size limit",
      message: "exceeds file size limit",
      test: (file) => (file?.size || 0) <= size,
    });

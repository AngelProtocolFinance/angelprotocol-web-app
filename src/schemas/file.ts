import * as Yup from "yup";

export const genFileSchema = (size: number, types: string[]) =>
  Yup.mixed<File>()
    .test({
      name: "must be of correct type",
      message: "Valid file types are JPG, PNG, WEBP and SVG",
      test: (file) => (file ? types.includes(file.type) : true),
    })
    .test({
      name: "must be less than size limit",
      message: "Image size must be smaller than 1MB",
      test: (file) => (file?.size || 0) <= size,
    });

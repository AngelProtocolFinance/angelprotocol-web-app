import * as Yup from "yup";

/**
 * @param maxSize maximum file size in bytes
 * @param types an array of strings representing valid MIME types
 * @returns Yup schema for validating files
 */
export const genFileSchema = (maxSize: number, types: string[]) =>
  Yup.mixed<File>()
    .test({
      name: "must be of correct type",
      message: "invalid file type",
      test: (file) => (file ? types.includes(file.type) : true),
    })
    .test({
      name: "must be less than size limit",
      message: "exceeds file size limit",
      test: (file) => {
        console.log(`genFileSchema file.size:${file?.size}`);
        return (file?.size || 0) <= maxSize;
      },
    });

import * as Yup from "yup";

export type FormValues = {
  website: string;
  // Expects an array because FileDropzone component always returns an array of Files,
  // so this way it's easier to handle (Yup validation ensures single file uploaded)
  logo: File[];
};

const VALID_MIME_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const FILE_SCHEMA = Yup.mixed<File>()
  .test({
    name: "fileSize",
    message: "File size must be smaller than 25Mb",
    test: (file) => (file?.size || 0) <= 25000000,
  })
  .test({
    name: "fileType",
    message: "Valid file types are PDF, JPG and PNG",
    test: (file) => VALID_MIME_TYPES.includes(file?.type || "none"),
  });

export const SCHEMA = Yup.object().shape({
  website: Yup.string()
    .required("Organization website required")
    .url("Must be a valid URL"),
  logo: Yup.array<File>()
    .of(FILE_SCHEMA)
    .test({
      name: "exactlyOne",
      message: "Proof of identity required",
      test: (arr) => arr?.length === 1,
    }),
});

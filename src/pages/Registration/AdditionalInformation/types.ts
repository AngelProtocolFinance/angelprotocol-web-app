import * as Yup from "yup";

export type FormValues = {
  charityOverview: string;
  // Expects an array because FileDropzone component always returns an array of Files,
  // so this way it's easier to handle (Yup validation ensures single file uploaded)
  charityLogo: File[];
  charityBanner: File[];
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
  charityOverview: Yup.string().required("Organization description required"),
  charityLogo: Yup.array<File>()
    .of(FILE_SCHEMA)
    .test({
      name: "exactlyOne",
      message: "Charity logo required",
      test: (arr) => arr?.length === 1,
    }),
  charityBanner: Yup.array<File>()
    .of(FILE_SCHEMA)
    .test({
      name: "exactlyOne",
      message: "Charity banner required",
      test: (arr) => arr?.length === 1,
    }),
});

import * as Yup from "yup";

export type FormValues = {
  charityOverview: string;
  // Expects an array because FileDropzone component always returns an array of Files,
  // so this way it's easier to handle (Yup validation ensures single file uploaded)
  charityLogo: File[];
  charityBanner: File[];
};

const VALID_MIME_TYPES = ["image/jpeg", "image/png"];

export const SCHEMA = Yup.object().shape({
  charityOverview: Yup.string().required("Organization description required"),
  charityLogo: Yup.array<File>()
    .of(
      Yup.mixed<File>()
        .test({
          name: "fileSize",
          message: "Image size must be smaller than 300KB",
          test: (file) => (file?.size || 0) <= 3e5,
        })
        .test({
          name: "fileType",
          message: "Valid file types are JPG, PNG and other image types",
          test: (file) => VALID_MIME_TYPES.includes(file?.type || "none"),
        })
    )
    .test({
      name: "exactlyOne",
      message: "Charity logo required",
      test: (arr) => arr?.length === 1,
    }),
  charityBanner: Yup.array<File>()
    .of(
      Yup.mixed<File>()
        .test({
          name: "fileSize",
          message: "Image size must be smaller than 1MB",
          test: (file) => (file?.size || 0) <= 1e6,
        })
        .test({
          name: "fileType",
          message: "Valid file types are JPG, PNG and other image types",
          test: (file) => VALID_MIME_TYPES.includes(file?.type || "none"),
        })
    )
    .test({
      name: "exactlyOne",
      message: "Charity banner required",
      test: (arr) => arr?.length === 1,
    }),
});

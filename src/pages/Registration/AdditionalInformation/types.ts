import { FileWrapper } from "components/FileDropzone/types";
import * as Yup from "yup";

export type FormValues = {
  charityOverview: string;
  // Expects an array because FileDropzone component always returns an array of Files,
  // so this way it's easier to handle (Yup validation ensures single file uploaded)
  charityLogo: FileWrapper[];
  charityBanner: FileWrapper[];
};

const VALID_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/bmp",
  "image/svg+xml",
  "image/webp",
];

const FILE_SCHEMA = Yup.mixed<FileWrapper>()
  .test({
    name: "fileType",
    message: "Valid file types are PDF, JPG and PNG",
    test: (fileWrapper) =>
      fileWrapper?.file
        ? VALID_MIME_TYPES.includes(fileWrapper.file.type)
        : true,
  })
  .test({
    name: "invalidState",
    message: "Invalid internal state",
    test: (fileWrapper) =>
      // fileWrapper must be instantiated
      !!fileWrapper &&
      // file name must be set
      !!fileWrapper.name &&
      // either new file is uploaded or source URL to file is set
      (!!fileWrapper.file || !!fileWrapper.sourceUrl),
  });

export const SCHEMA = Yup.object().shape({
  charityOverview: Yup.string().required("Organization description required"),
  charityLogo: Yup.array<FileWrapper>()
    .of(
      FILE_SCHEMA.test({
        name: "fileSize",
        message: "Image size must be smaller than 300KB",
        test: (fileWrapper) => (fileWrapper?.file?.size || 0) <= 3e5,
      })
    )
    .test({
      name: "exactlyOne",
      message: "Charity logo required",
      test: (arr) => arr?.length === 1,
    }),
  charityBanner: Yup.array<FileWrapper>()
    .of(
      FILE_SCHEMA.test({
        name: "fileSize",
        message: "Image size must be smaller than 1MB",
        test: (fileWrapper) => (fileWrapper?.file?.size || 0) <= 1e6,
      })
    )
    .test({
      name: "exactlyOne",
      message: "Charity banner required",
      test: (arr) => arr?.length === 1,
    }),
});

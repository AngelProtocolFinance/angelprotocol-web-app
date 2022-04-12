import { FileWrapper } from "components/FileDropzone/types";
import * as Yup from "yup";

export type FormValues = {
  charityOverview: string;
  charityLogo: FileWrapper;
  banner: FileWrapper;
};

const VALID_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

const FILE_SCHEMA = Yup.mixed<FileWrapper>()
  .test({
    name: "fileType",
    message: "Valid file types are JPG, PNG and WEBP",
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
      {
        console.log(fileWrapper);

        return (
          !!fileWrapper &&
          // file name must be set
          !!fileWrapper.name &&
          // either new file is uploaded or source URL to file is set
          (!!fileWrapper.file || !!fileWrapper.sourceUrl)
        );
      },
  });

export const SCHEMA = Yup.object().shape({
  charityOverview: Yup.string().required("Organization description required"),
  charityLogo: FILE_SCHEMA.test({
    name: "fileSize",
    message: "Image size must be smaller than 300KB",
    test: (fileWrapper) => (fileWrapper?.file?.size || 0) <= 3e5,
  }),
  banner: FILE_SCHEMA.test({
    name: "fileSize",
    message: "Image size must be smaller than 1MB",
    test: (fileWrapper) => (fileWrapper?.file?.size || 0) <= 1e6,
  }),
});

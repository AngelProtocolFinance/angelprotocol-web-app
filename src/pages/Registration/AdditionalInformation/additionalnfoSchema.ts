import * as Yup from "yup";
import { AdditionalInfoValues } from "../types";
import { FileWrapper } from "components/FileDropzone/types";
import { SchemaShape } from "schemas/types";

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
      !!fileWrapper &&
      // file name must be set
      !!fileWrapper.name &&
      // either new file is uploaded or source URL to file is set
      (!!fileWrapper.file || !!fileWrapper.publicUrl),
  });

const additionalnfoShape: SchemaShape<AdditionalInfoValues> = {
  charityOverview: Yup.string().required("Organization description required"),
  charityLogo: FILE_SCHEMA.test({
    name: "fileSize",
    message: "Image size must be smaller than 1MB",
    test: (fileWrapper) => (fileWrapper?.file?.size || 0) <= 1e6,
  }),
  banner: FILE_SCHEMA.test({
    name: "fileSize",
    message: "Image size must be smaller than 1MB",
    test: (fileWrapper) => (fileWrapper?.file?.size || 0) <= 1e6,
  }),
};

export const additionalInfoSchema = Yup.object().shape(additionalnfoShape);

import * as Yup from "yup";
import { UpdateProfileValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { FileWrapper } from "components/FileDropzone";
import { positiveNumber } from "schemas/number";
import { stringByteSchema, url } from "schemas/string";
import { proposalShape } from "../../constants";

export const VALID_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg",
];

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
    name: "fileSize",
    message: "Image size must be smaller than 1MB",
    test: (fileWrapper) => (fileWrapper?.file?.size || 0) <= 1e6,
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

//construct strict shape to avoid hardcoding shape keys
const shape: SchemaShape<UpdateProfileValues> = {
  ...proposalShape,
  name: stringByteSchema("name", 4, 64),
  overview: stringByteSchema("overview", 4, 1024),
  //sdgNum: no need to validate, selected from dropdown with default value
  //tier: TODO: this field is not touched here for endowment owner, will be added on distinction of config owner
  //logo: no need to validate, url is auto generated
  image: FILE_SCHEMA,
  url: url,
  // registration_number: no need to validate
  // country_city_origin: no need to validate
  contact_email: Yup.string().email("invalid email"),
  facebook: url,
  twitter: url,
  linkedin: url,
  number_of_employees: positiveNumber,
  // average_annual_budget: render string as is
  // annual_revenue: render string as is
  // charity_navigator_rating: render string as is
  // endow_type: TODO: this field, like tier, is for config owner
};

export const schema = Yup.object().shape(shape);

import * as Yup from "yup";
import { AdditionalInfoValues } from "../types";
import { ImgLink } from "components/ImgEditor/types";
import { SchemaShape } from "schemas/types";
import { genFileSchema } from "schemas/file";
import { stringByteSchema } from "schemas/string";

export const VALID_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg",
];

const urlKey: keyof ImgLink = "publicUrl";
const imgShape: SchemaShape<ImgLink> = {
  file: genFileSchema(1e6, VALID_MIME_TYPES).when(urlKey, (url, schema) =>
    url ? schema.optional() : schema.required("required")
  ),
};

const additionalnfoShape: SchemaShape<AdditionalInfoValues> = {
  charityOverview: stringByteSchema("overview", 4, 1024),
  charityLogo: Yup.object().shape(imgShape),
  banner: Yup.object().shape(imgShape),
};

export const additionalInfoSchema = Yup.object().shape(additionalnfoShape);

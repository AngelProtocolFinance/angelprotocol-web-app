import { ObjectSchema, array, date, object } from "yup";
import { FV, FormMilestone } from "./types";
import { SchemaShape } from "schemas/types";
import { ImageMIMEType } from "types/lists";
import { ImgLink } from "components/ImgEditor";
import { genFileSchema } from "schemas/file";
import { richTextContent } from "schemas/shape";
import { requiredString } from "schemas/string";

export const VALID_MIME_TYPES: ImageMIMEType[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

const MAX_SIZE_IN_BYTES = 1e6;
export const MAX_CHARS = 500;

// we only need to validate the pre-crop image and if we confirm it is valid
// we can be sure that the cropped image is valid too
const fileObj = object().shape<SchemaShape<ImgLink>>({
  precropFile: genFileSchema(MAX_SIZE_IN_BYTES, VALID_MIME_TYPES),
});

const milesStoneSchema = object<any, SchemaShape<FormMilestone>>({
  milestone_date: date().typeError("invalid date"),
  milestone_description: richTextContent({ maxChars: MAX_CHARS }),
  milestone_title: requiredString,
  milestone_media: fileObj,
});

//construct strict shape to avoid hardcoding shape keys

export const schema = object<any, SchemaShape<FV>>({
  title: requiredString.trim(),
  description: richTextContent({ maxChars: MAX_CHARS, required: true }),
  image: fileObj,
  milestones: array(milesStoneSchema),
}) as ObjectSchema<FV>;

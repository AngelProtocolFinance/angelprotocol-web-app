import * as Yup from "yup";
import { ProfileFormValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { CountryOption } from "services/types";
import { ImgLink } from "components/ImgEditor";
import { genFileSchema } from "schemas/file";
import { requiredString, stringByteSchema, url } from "schemas/string";
import { proposalShape } from "../../constants";

export const VALID_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg",
];

const fileObj = Yup.object().shape<SchemaShape<ImgLink>>({
  file: genFileSchema(1e6, VALID_MIME_TYPES).when("publicUrl", {
    is: (value: string) => !value,
    then: (schema) => schema.required(),
  }),
});

//construct strict shape to avoid hardcoding shape keys
const shape: SchemaShape<ProfileFormValues> = {
  ...proposalShape,
  name: stringByteSchema(4, 64),
  overview: stringByteSchema(4, 1024),
  //sdgNum: no need to validate, selected from dropdown with default value
  //tier: TODO: this field is not touched here for endowment owner, will be added on distinction of config owner
  //logo: no need to validate, url is auto generated
  image: fileObj,
  logo: fileObj,
  url: url.required("required"),
  // registration_number: no need to validate
  // country_city_origin: no need to validate
  country: Yup.object().shape<SchemaShape<CountryOption>>({
    name: requiredString,
  }),
  contact_email: Yup.string().email("invalid email"),
  facebook: url,
  twitter: url,
  linkedin: url,
  // average_annual_budget: render string as is
  // annual_revenue: render string as is
  // charity_navigator_rating: render string as is
  // endow_type: TODO: this field, like tier, is for config owner
};

export const schema = Yup.object().shape(shape);

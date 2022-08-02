import * as Yup from "yup";
import { UpdateProfileValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { proposalShape } from "pages/Admin/Templates/proposalShape";
import { positiveNumber } from "schemas/number";
import { stringByteSchema, url } from "schemas/string";

//construct strict shape to avoid hardcoding shape keys
const profileEditShape: SchemaShape<UpdateProfileValues> = {
  ...proposalShape,
  name: stringByteSchema("name", 4, 64),
  overview: stringByteSchema("overview", 4, 1024),
  un_sdg: Yup.number(), //cast to number
  //tier: TODO: this field is not touched here for endowment owner, will be added on distinction of config owner
  //logo: no need to validate, url is auto generated
  //image: no need to validate, url is auto generated
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

export const profileEditSchema = Yup.object().shape(profileEditShape);

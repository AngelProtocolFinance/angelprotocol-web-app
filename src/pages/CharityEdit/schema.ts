import { EditableProfileAttr } from "services/aws/endowments/types";
import { PartialRecord } from "types/types";
import * as Yup from "yup";

//construct strict shape to avoid hardcoding shape keys
const strictShape: PartialRecord<
  keyof EditableProfileAttr,
  Yup.StringSchema | Yup.NumberSchema
> = {
  //these fields are optional, owners can opt not to give details,
  //but when they do, make sure they give correct one
  charity_email: Yup.string().email("invalid email"),
  facebook_page: Yup.string().url("invalid url"),
  linkedin_page: Yup.string().url("invalid url"),
  twitter_handle: Yup.string().url("invalid url"),

  //other fields are optional, due diligence of owner to update profile
};

export const schema = Yup.object().shape(strictShape);

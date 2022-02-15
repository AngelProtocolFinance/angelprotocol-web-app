import { profile } from "services/aws/endowments/placeholders";
import { EditableProfileAttr } from "services/aws/endowments/types";

const {
  url,
  charity_owner,
  is_placeholder,
  charity_programs,
  news_media_articles,
  ...editableAttr
} = profile;

export const initialFormState: EditableProfileAttr = editableAttr;

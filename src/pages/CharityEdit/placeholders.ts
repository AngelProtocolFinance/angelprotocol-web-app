import { EditableProfileAttr } from "types/services/aws/endowments";
import { profile } from "services/aws/endowments/placeholders";

const {
  url,
  charity_owner,
  is_placeholder,
  charity_programs,
  news_media_articles,
  ...editableAttr
} = profile;

export const initialFormState: EditableProfileAttr = editableAttr;

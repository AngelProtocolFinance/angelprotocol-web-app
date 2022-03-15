import {
  EditableProfileAttr,
  Profile,
  ReadOnlyAttr,
} from "services/aws/endowments/types";

export default function removeReadOnlyProfileAttr(
  profile: Profile
): EditableProfileAttr {
  const editableProfileAttr: any = {};
  for (const key in profile) {
    if (!(key in objectWithReadOnlyKeys)) {
      editableProfileAttr[key] = profile[key as keyof Profile];
    }
  }
  return editableProfileAttr;
}

const objectWithReadOnlyKeys: { [key in ReadOnlyAttr]: "" } = {
  url: "",
  charity_owner: "",
  endowment_address: "",
  total_liq: "",
  total_lock: "",
  overall: "",
  charity_programs: "",
  news_media_articles: "",
};

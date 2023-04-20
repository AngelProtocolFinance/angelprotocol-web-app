import { ASTProfileUpdate } from "types/aws";
import { ImgLink } from "components/ImgEditor";

type K = keyof ASTProfileUpdate;
const _logo: K = "logo";
const _img: K = "image";
const _id: K = "id";
const _owner: K = "owner";

export type FlatFormValues = Omit<
  ASTProfileUpdate,
  /** not editable fields*/
  typeof _id | typeof _owner
>;

export type FormValues = Omit<FlatFormValues, typeof _logo | typeof _img> & {
  [_logo]: ImgLink;
  [_img]: ImgLink;
  initial: FlatFormValues;
};

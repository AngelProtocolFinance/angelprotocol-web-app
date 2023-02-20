import { Documentation } from "pages/Registration/types";

type Key = keyof Documentation;
const _level: Key = "level";

export type FormValues = Omit<Documentation, typeof _level> & {
  [_level]: never;
};

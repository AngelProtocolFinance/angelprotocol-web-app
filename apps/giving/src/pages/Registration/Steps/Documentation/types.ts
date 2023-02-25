import { Documentation } from "../../types";

type Key = keyof Documentation;
const _level: Key = "level";

export type FormValues = Omit<Documentation, typeof _level>;

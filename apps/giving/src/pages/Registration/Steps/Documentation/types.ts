import { Documentation } from "../../types";

export type FormValues = Omit<Documentation, "level"> & { level: never };

import { Documentation } from "pages/Registration/types";

export type FormValues = Omit<Documentation, "level"> & { level: never };

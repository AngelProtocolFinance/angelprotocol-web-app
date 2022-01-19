import { ReactNode } from "react";
import { Step } from "services/transaction/types";

export type Display = { [key in Step]?: ReactNode };

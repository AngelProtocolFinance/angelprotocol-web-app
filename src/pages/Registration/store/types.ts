import { CharityData } from "services/aws/types";

export type User = CharityData & { token?: string };

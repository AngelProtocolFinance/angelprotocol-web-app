import { Charity } from "services/aws/types";

export type CharityData = Charity & { token?: string };

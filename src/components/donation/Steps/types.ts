import { DonaterConfigFromWidget } from "types/widget";

export type Config = Omit<DonaterConfigFromWidget, "isDescriptionTextHidden">;

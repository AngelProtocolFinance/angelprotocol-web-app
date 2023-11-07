import { Group } from "types/aws";

/**
 *
 * @param requirements account requirement data
 * @returns boolean indicating whether the field is a country selector
 */
export const isCountry = (requirements: Group): boolean =>
  requirements.key.includes("country");

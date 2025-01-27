import countries from "assets/countries/all.json";
import type { Country } from "types/components";

export const country = (name: string): Country => {
  const detailed = countries.find((c) => c.name === name);
  return {
    name,
    code: detailed?.code ?? "",
    flag: detailed?.flag ?? "",
  };
};

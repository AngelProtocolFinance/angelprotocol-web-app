import { Country } from "types/components";
import countries from "assets/countries/all.json";

export const country = (name: string): Country => {
  const detailed = countries.find((c) => c.name === name);
  return {
    name,
    code: detailed?.code ?? "",
    flag: detailed?.flag ?? "",
  };
};

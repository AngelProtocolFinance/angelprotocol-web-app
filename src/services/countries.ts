import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Country, CountryOption } from "./types";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://restcountries.com/v3.1",
  }),
  tagTypes: ["countries"],
  endpoints: (builder) => ({
    countries: builder.query<CountryOption[], unknown>({
      query: () => ({
        url: "all",
        params: { fields: "name,flags" },
      }),

      transformResponse(res: Country[]) {
        return res
          .map((country) => ({
            name: country.name.common,
            flag: country.flags.svg || country.flags.png || "",
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
      },
    }),
    countryFlag: builder.query<string, string>({
      query: (
        countryName /**should come from previously selected country*/
      ) => ({
        url: `name/${countryName}`,
        params: { fields: "flags" },
      }),
      transformResponse(res: Country[]) {
        const flags = res[0].flags;
        return flags.svg || flags.png || "";
      },
    }),
  }),
});

export const { useCountriesQuery, useLazyCountryFlagQuery } = countriesApi;

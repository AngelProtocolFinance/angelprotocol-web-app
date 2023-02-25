import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Country, CountryInRegion, CountryOption, Regions } from "./types";

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
    regions: builder.query<Regions, unknown>({
      query: () => ({
        url: "all",
        params: { fields: "name,region" },
      }),
      transformResponse(res: CountryInRegion[]) {
        const result = res.reduce((result, curr) => {
          result[curr.region] ||= [];
          result[curr.region].push(curr.name.common);
          return result;
        }, {} as Regions);

        //sort countries
        for (const region in result) {
          result[region].sort();
        }

        return result;
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

export const { useCountriesQuery, useLazyCountryFlagQuery, useRegionsQuery } =
  countriesApi;

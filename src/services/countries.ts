import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Country, CountryOption } from "./types";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://restcountries.com/v3.1",
  }),
  tagTypes: ["countries"],
  endpoints: (builder) => ({
    countries: builder.query<CountryOption[], string>({
      providesTags: (result, error, arg) =>
        result ? [{ type: "countries", id: arg }] : ["countries"],
      query: (arg) => ({
        url: `name/${arg}`,
        params: { fields: "name,flags" },
      }),

      transformResponse(res: Country[]) {
        return res.slice(0, 10 /**return first 5 only */).map((country) => ({
          name: country.name.common,
          flag: country.flags.svg || country.flags.png || "",
        }));
      },
    }),
  }),
});

export const { useCountriesQuery } = countriesApi;

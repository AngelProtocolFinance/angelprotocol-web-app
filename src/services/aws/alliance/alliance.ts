import { aws } from "../aws";
import { Result, Details } from "./types";

const alliance_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    donors: builder.query<Details[], unknown>({
      query: () => "alliance",
      transformResponse: (res: Result) => {
        // const _donors: Donors = {};
        const _result = res.Items.map((donor) => {
          return {
            name: donor.name,
            icon: donor.icon,
            iconLight: donor.iconLight || false,
            address: donor.address,
          };
        });
        _result.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        return _result;
      },
    }),
  }),
});

export const { useDonorsQuery } = alliance_api;

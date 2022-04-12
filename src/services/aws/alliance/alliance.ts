import { aws } from "../aws";
import { Donors, Result } from "./types";

const alliance_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    donors: builder.query<Donors, unknown>({
      query: () => "alliance",
      transformResponse: (res: Result) => {
        const _donors: Donors = {};
        res.Items.forEach((donor) => {
          _donors[donor.address] = {
            name: donor.name,
            icon: donor.icon,
            iconLight: donor.iconLight || false,
          };
        });
        return _donors;
      },
    }),
  }),
});

export const { useDonorsQuery } = alliance_api;

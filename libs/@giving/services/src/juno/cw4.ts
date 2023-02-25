import { Res, Result, WithAddrArgs } from "./queryContract/types";
import { junoApi } from ".";
import { genQueryPath } from "./queryContract/genQueryPath";
import { adminTags } from "./tags";

export const cw4Api = junoApi.injectEndpoints({
  endpoints: (builder) => ({
    //CW4
    members: builder.query<Result<"cw4Members">, WithAddrArgs<"cw4Members">>({
      providesTags: [{ type: "admin", id: adminTags.members }],
      query: (contract) => genQueryPath("cw4Members", null, contract),
      transformResponse: (res: Res<"cw4Members">) => {
        return res.data.members;
      },
    }),
  }),
});

export const { useMembersQuery } = cw4Api;

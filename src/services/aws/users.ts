import { TEMP_JWT } from "constants/auth";
import { IS_TEST } from "constants/env";
import type {
  DetailedUserEndow,
  UserEndow,
  UserEndowMeta,
  UserUpdate,
} from "types/aws";
import { version as v } from "../helpers";
import { aws } from "./aws";

const endowAdmins = aws.injectEndpoints({
  endpoints: (builder) => ({
    editUser: builder.mutation<UserUpdate, UserUpdate & { userEmail: string }>({
      invalidatesTags: ["user"],
      query: ({ userEmail, ...payload }) => {
        return {
          method: "PATCH",
          url: `/${v(2)}/users/${userEmail}`,
          headers: { Authorization: TEMP_JWT },
          body: payload,
        };
      },
    }),
    detailedUserEndows: builder.query<DetailedUserEndow[], number[]>({
      queryFn: async (arg, _api, _extraOpts, baseQuery) => {
        const endowIds: number[] = [];
        const userEndows: DetailedUserEndow[] = [];
        for (const endowId of endowIds) {
          const [res1, res2] = await Promise.all([
            baseQuery({
              url: `v8/endowments/${endowId}`,
              params: {
                env: IS_TEST ? "staging" : "production",
                fields: ["name", "logo"],
              },
            }),
            baseQuery({
              url: `endowments/${endowId}/users/{userId}`,
              headers: { authorization: TEMP_JWT },
            }),
          ]);

          const meta = res1.data as UserEndowMeta;
          const userEndow = res2.data as UserEndow;
          userEndows.push({ ...meta, ...userEndow });
        }

        return { data: userEndows };
      },
    }),
  }),
});

export const { useEditUserMutation } = endowAdmins;

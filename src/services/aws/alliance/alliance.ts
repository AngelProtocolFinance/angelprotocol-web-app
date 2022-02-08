import { aws } from "../aws";
import { Result, Details } from "./types";

function sortData(data: Details[]) {
  const _result = data.map((donor) => {
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
}

const alliance_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    donors: builder.query<Details[], unknown>({
      query: () => "alliance",
      transformResponse: (res: Result) => {
        return sortData(res.Items);
      },
    }),
    createNewMember: builder.mutation<any, any>({
      query: (body) => ({
        url: "alliance",
        method: "POST",
        body,
      }),
      transformResponse: (res: Result) => {
        return res.Items ? sortData(res.Items) : res;
      },
    }),
    removeMember: builder.mutation<any, any>({
      query: (data) => ({
        url: `alliance/${data.wallet}`,
        params: { name: data.name },
        method: "DELETE",
      }),
      transformResponse: (res: Result) => {
        return res.Items ? sortData(res.Items) : res;
      },
    }),
  }),
});

export const {
  useDonorsQuery,
  useCreateNewMemberMutation,
  useRemoveMemberMutation,
} = alliance_api;

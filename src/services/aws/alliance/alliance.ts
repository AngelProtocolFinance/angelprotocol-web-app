import { aws } from "../aws";
import { alliance, tags } from "../tags";
import { AWSQueryRes } from "../types";
import {
  EditMemberPayload,
  MemberDetails,
  MemberLookUp,
  NewMemberPayload,
  ToRemoveMember,
} from "./types";

export const alliance_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    allianceLookup: builder.query<MemberLookUp, unknown>({
      providesTags: [{ type: tags.alliance, id: alliance.members }],
      query: () => "alliance",
      transformResponse: (res: AWSQueryRes<MemberDetails[]>) => {
        return res.Items.reduce((result, member) => {
          const { address, ...rest } = member;
          result[address] = rest;
          return result;
        }, {} as MemberLookUp);
      },
    }),

    createNewMember: builder.mutation<any, NewMemberPayload>({
      invalidatesTags: [{ type: tags.alliance, id: alliance.members }],
      query: (body) => {
        const isBase64url = /data:image/.test(body.icon || "");
        const isDefaultIcon = /static/.test(body.icon || "");
        if (!isBase64url || isDefaultIcon) delete body.icon;
        return {
          url: "alliance",
          method: "POST",
          body,
        };
      },
    }),
    editMember: builder.mutation<any, EditMemberPayload>({
      invalidatesTags: [{ type: tags.alliance, id: alliance.members }],
      query: (body) => {
        const { address, name, ...restBody } = body;
        const isBase64url = /data:image/.test(restBody.icon || "");
        const isDefaultIcon = /static/.test(restBody.icon || "");
        if (!isBase64url || isDefaultIcon) delete restBody.icon;
        return {
          url: `alliance/${address}`,
          params: { name },
          method: "PUT",
          body: restBody,
        };
      },
    }),
    //NOTE: edit member isn't practical since both name and wallet address can't be edited
    //as they are part of the partition key
    removeMember: builder.mutation<any, ToRemoveMember>({
      invalidatesTags: [{ type: tags.alliance, id: alliance.members }],
      query: (toRemoveMember) => ({
        url: `alliance/${toRemoveMember.address}`,
        params: { name: toRemoveMember.name },
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateNewMemberMutation,
  useRemoveMemberMutation,
  useEditMemberMutation,
} = alliance_api;

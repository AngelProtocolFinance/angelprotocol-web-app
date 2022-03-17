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
import defaultIcon from "assets/icons/tca/Angel-Alliance-logo.png";

export const alliance_api = aws.injectEndpoints({
  endpoints: (builder) => ({
    allianceMembers: builder.query<MemberDetails[], unknown>({
      providesTags: [{ type: tags.alliance, id: alliance.members }],
      query: () => "alliance",
      transformResponse: (res: AWSQueryRes<MemberDetails[]>) => {
        return sortMembers(res.Items);
      },
    }),
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
        if (!isBase64url) delete body.icon;
        return {
          url: "alliance",
          method: "POST",
          body,
        };
      },
    }),
    editMember: builder.mutation<any, EditMemberPayload>({
      invalidatesTags: [{ type: tags.alliance, id: alliance.members }],
      query: ({ address, name, ...restBody }) => {
        const isBase64url = /data:image/.test(restBody.icon || "");
        if (!isBase64url) delete restBody.icon;
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

function sortMembers(members: MemberDetails[]) {
  return members
    .map((member) => ({
      name: member.name,
      icon: member.icon || defaultIcon,
      iconLight: member.iconLight || false,
      address: member.address,
    }))
    .sort((a, b) => {
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
}

export const {
  useCreateNewMemberMutation,
  useRemoveMemberMutation,
  useEditMemberMutation,
} = alliance_api;

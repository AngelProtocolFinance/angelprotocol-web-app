import { aws } from "../aws";
import { alliance, tags } from "../tags";
import { AWSQueryRes } from "../types";
import { MemberDetails, MemberLookUp, ToRemoveMember } from "./types";
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

    createNewMember: builder.mutation<any, MemberDetails>({
      invalidatesTags: [{ type: tags.alliance, id: alliance.members }],
      query: (body) => ({
        url: "alliance",
        method: "POST",
        body,
      }),
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

export const { useCreateNewMemberMutation, useRemoveMemberMutation } =
  alliance_api;

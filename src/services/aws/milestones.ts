import type {
  Milestone,
  MilestoneUpdate,
  NewMilestone,
} from "@better-giving/endowment";
import { TEMP_JWT } from "constants/auth";
import type { MilestoneDelete } from "types/aws";
import { version as v } from "../helpers";
import { aws } from "./aws";

const milestones = aws.injectEndpoints({
  endpoints: (builder) => ({
    newMilestone: builder.mutation<
      { id: string },
      NewMilestone & { endowId: number; programId: string }
    >({
      invalidatesTags: (_, error) => (error ? [] : ["program"]),
      query: ({ endowId, programId, ...payload }) => {
        return {
          url: `/${v(
            1
          )}/endowments/${endowId}/programs/${programId}/milestones`,
          method: "POST",
          headers: { authorization: TEMP_JWT },
          body: payload,
        };
      },
    }),
    editMilestone: builder.mutation<
      Milestone,
      MilestoneUpdate & { endowId: number; programId: string; id: string }
    >({
      invalidatesTags: (_, error) => (error ? [] : ["program"]),
      query: ({ endowId, programId, id, ...payload }) => {
        return {
          url: `/${v(
            1
          )}/endowments/${endowId}/programs/${programId}/milestones/${id}`,
          method: "PATCH",
          headers: { authorization: TEMP_JWT },
          body: payload,
        };
      },
    }),
    deleteMilestone: builder.mutation<unknown, MilestoneDelete>({
      invalidatesTags: (_, error) => (error ? [] : ["program"]),
      query: ({ endowId, programId, milestoneId }) => {
        return {
          url: `/${v(
            1
          )}/endowments/${endowId}/programs/${programId}/milestones/${milestoneId}`,
          method: "DELETE",
          headers: { authorization: TEMP_JWT },
        };
      },
    }),
  }),
});

export const {
  useEditMilestoneMutation,
  useNewMilestoneMutation,
  useDeleteMilestoneMutation,
} = milestones;

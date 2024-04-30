import { TEMP_JWT } from "constants/auth";
import { Milestone, MilestoneUpdate, NewMilestone } from "types/aws";
import { version as v } from "../helpers";
import { aws } from "./aws";

const milestones = aws.injectEndpoints({
  endpoints: (builder) => ({
    newMilestone: builder.mutation<
      Milestone,
      NewMilestone & { endowId: number; programId: string }
    >({
      invalidatesTags: (_, error) => (error ? [] : ["programs"]),
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
      MilestoneUpdate & { endowId: number; programId: string }
    >({
      invalidatesTags: (_, error) => (error ? [] : ["programs"]),
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
  }),
});

export const { useEditMilestoneMutation, useNewMilestoneMutation } = milestones;

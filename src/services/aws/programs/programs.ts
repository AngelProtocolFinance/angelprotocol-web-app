import { TEMP_JWT } from "constants/auth";
import type { NewProgram, Program, ProgramUpdate } from "types/aws";
import { version as v } from "../../helpers";
import type { ProgramDeleteMsg } from "../../types";
import { aws } from "../aws";

const programs = aws.injectEndpoints({
  endpoints: (builder) => ({
    programs: builder.query<Program[], number>({
      providesTags: ["programs", "program"],
      query: (endowId) => `/${v(1)}/endowments/${endowId}/programs`,
    }),
    program: builder.query<Program, { endowId: number; programId: string }>({
      providesTags: ["program"],
      query: ({ endowId, programId }) =>
        `/${v(1)}/endowments/${endowId}/programs/${programId}`,
    }),
    newProgram: builder.mutation<
      { id: string },
      NewProgram & { endowId: number }
    >({
      invalidatesTags: (_, error) => (error ? [] : ["programs"]),
      query: ({ endowId, ...payload }) => {
        return {
          url: `/${v(1)}/endowments/${endowId}/programs`,
          method: "POST",
          headers: { authorization: TEMP_JWT },
          body: payload,
        };
      },
    }),
    editProgram: builder.mutation<Program, ProgramUpdate & { endowId: number }>(
      {
        invalidatesTags: (_, error) => (error ? [] : ["program", "programs"]),
        query: ({ endowId, id, ...payload }) => {
          return {
            url: `/${v(1)}/endowments/${endowId}/programs/${id}`,
            method: "PATCH",
            headers: { authorization: TEMP_JWT },
            body: payload,
          };
        },
      }
    ),
    deleteProgram: builder.mutation<unknown, ProgramDeleteMsg>({
      invalidatesTags: (_, error) => (error ? [] : ["programs"]),
      query: ({ id, program_id }) => {
        return {
          url: `/${v(2)}/endowments/${id}/programs/${program_id}`,
          method: "DELETE",
          headers: { authorization: TEMP_JWT },
        };
      },
    }),
  }),
});

export const {
  useProgramsQuery,
  useProgramQuery,
  useNewProgramMutation,
  useEditProgramMutation,
  useDeleteProgramMutation,
} = programs;

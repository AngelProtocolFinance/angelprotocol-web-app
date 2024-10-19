import { TEMP_JWT } from "constants/auth";
import type { Program, ProgramUpdate } from "types/aws";
import { version as v } from "../../helpers";
import { aws } from "../aws";

const programs = aws.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useEditProgramMutation } = programs;

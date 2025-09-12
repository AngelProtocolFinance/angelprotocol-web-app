import type { IProgram } from "@better-giving/endowment";
import { http, HttpResponse } from "msw";

export const mockPrograms: IProgram[] = [
  {
    id: "program-1",
    title: "Program 1",
    description: "Description for Program 1",
    milestones: [],
  },
  {
    id: "program-2",
    title: "Program 2",
    description: "Description for Program 2",
    milestones: [],
  },
];

export const handlers = [
  http.get(`api/npo/:id/programs`, () => {
    return HttpResponse.json(mockPrograms);
  }),
];

import type { Program } from "@better-giving/endowment";
import { APIs } from "constants/urls";
import { http, HttpResponse } from "msw";
import { version as v } from "../../helpers";

export const mockPrograms: Program[] = [
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
  http.get(`${APIs.aws}/${v(1)}/endowments/:endowId/programs`, () => {
    return HttpResponse.json(mockPrograms);
  }),
];

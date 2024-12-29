import type { Program } from "@better-giving/endowment";
import { ver } from "api/api";
import { APIs } from "constants/urls";
import { http, HttpResponse } from "msw";

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
  http.get(`${APIs.aws}/${ver(1)}/endowments/:endowId/programs`, () => {
    return HttpResponse.json(mockPrograms);
  }),
];

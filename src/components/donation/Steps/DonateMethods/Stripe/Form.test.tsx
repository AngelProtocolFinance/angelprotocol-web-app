import { fireEvent, render, screen } from "@testing-library/react";
import * as apes from "services/apes";
import * as programs from "services/aws/programs";
import type { Program } from "types/aws";
import type { DetailedCurrency } from "types/components";
import { beforeEach, describe, expect, it, test, vi } from "vitest";
import type { Init } from "../../types";
import Form from "./Form";

const defaultCurrency: DetailedCurrency = {
  code: "PHP",
  rate: 50,
  min: 50,
};
const mockCurrencies: DetailedCurrency[] = [
  { code: "USD", rate: 1, min: 1 },
  { code: "EUR", rate: 0.92, min: 0.92 },
  { code: "GBP", rate: 0.79, min: 0.79 },
];

vi.mock("store/accessors", () => ({
  useGetter: vi.fn(() => ({ user: null })),
}));

vi.spyOn(apes, "useFiatCurrenciesQuery").mockReturnValue({
  data: {
    currencies: mockCurrencies,
    defaultCurr: defaultCurrency,
  },
  isLoading: false,
  isError: false,
  error: null,
} as any);

const mockPrograms: Program[] = [
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

vi.spyOn(programs, "useProgramsQuery").mockReturnValue({
  data: mockPrograms,
  isLoading: false,
  isFetching: false,
  isError: false,
  //we don't need other  attributes
} as any);

vi.mock("../../Context", () => ({
  useDonationState: vi.fn(() => ({ setState: vi.fn() })),
}));

const init: Init = {
  source: "bg-marketplace",
  mode: "live",
  recipient: {
    id: 123456,
    name: "Example Endowment",
  },
  config: null,
};

describe("Stripe form test", () => {
  test("stripe form loads", () => {
    render(<Form step="donate-form" init={init} />);

    screen.debug();
  });
});

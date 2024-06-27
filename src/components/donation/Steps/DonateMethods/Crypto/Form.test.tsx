import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { chains } from "constants/chains";
import * as apes from "services/apes";
import * as programs from "services/aws/programs";
import type { Program, Token } from "types/aws";
import { afterAll, describe, expect, test, vi } from "vitest";
import type { CryptoFormStep, Init } from "../../types";
import Form from "./Form";

const mockTokens: Token[] = [
  {
    name: "Sample Token 1",
    symbol: "STK1",
    token_id: "sample-token-1",
    type: "erc20",
    coingecko_denom: "sample-token-1",
    min_donation_amnt: 100,
    approved: true,
    logo: "https://example.com/sample-token-1-logo.png",
    decimals: 18,
  },
  {
    name: "Sample Token 2",
    symbol: "STK2",
    token_id: "sample-token-2",
    type: "erc20",
    coingecko_denom: "sample-token-2",
    min_donation_amnt: 50,
    approved: true,
    logo: "https://example.com/sample-token-2-logo.png",
    decimals: 18,
  },
];

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

vi.spyOn(apes, "useTokensQuery").mockReturnValue({
  data: mockTokens,
  isLoading: false,
  isFetching: false,
  isError: false,
  //we don't need other attributes
} as any);

vi.spyOn(programs, "useProgramsQuery").mockReturnValue({
  data: mockPrograms,
  isLoading: false,
  isFetching: false,
  isError: false,
  //we don't need other  attributes
} as any);

const mockedSetState = vi.hoisted(() => vi.fn());
vi.mock("../../Context", () => ({
  useDonationState: vi
    .fn()
    .mockReturnValue({ state: {}, setState: mockedSetState }),
}));

describe("Crypto form: initial load", () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });
  test("initial form state: no persisted details", () => {
    const init: Init = {
      source: "bg-marketplace",
      config: { liquidSplitPct: 50, splitDisabled: false },
      recipient: { id: 0, name: "" },
      mode: "live",
    };

    const state: CryptoFormStep = {
      step: "donate-form",
      init,
    };
    render(<Form {...state} />);

    const chainInput = screen.getByPlaceholderText(/search network/i);
    expect(chainInput).toBeInTheDocument();

    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toBeInTheDocument();

    const tokenSelector = screen.getByRole("button", {
      name: /select token/i,
    });
    expect(tokenSelector).toBeInTheDocument();

    const programSelector = screen.getByRole("button", {
      name: /general donation/i,
    });
    expect(programSelector).toBeInTheDocument();
  });

  test("initial form state: program donations not allowed", () => {
    const init: Init = {
      source: "bg-marketplace",
      config: { liquidSplitPct: 50, splitDisabled: false },
      recipient: { id: 0, name: "", progDonationsAllowed: false },
      mode: "live",
    };

    const state: CryptoFormStep = {
      step: "donate-form",
      init,
    };
    render(<Form {...state} />);
    const programSelector = screen.queryByRole("button", {
      name: /general donation/i,
    });
    expect(programSelector).toBeNull();
  });

  test("submit form with initial/persisted data", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: { liquidSplitPct: 50, splitDisabled: false },
      recipient: { id: 0, name: "" },
      mode: "live",
    };

    const amount = "100.33";
    const state: CryptoFormStep = {
      step: "donate-form",
      init,
      details: {
        method: "crypto",
        token: { ...mockTokens[1], amount },
        chainId: "80002",
        program: { label: mockPrograms[0].title, value: mockPrograms[0].id },
      },
    } as const;
    render(<Form {...state} />);

    const chainInput = screen.getByDisplayValue(chains["80002"].name);
    expect(chainInput).toBeInTheDocument();

    const amountInput = screen.getByDisplayValue(amount);
    expect(amountInput).toBeInTheDocument();

    const programSelector = screen.getByRole("button", {
      name: /program 1/i,
    });
    expect(programSelector).toBeInTheDocument();

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);
    expect(mockedSetState).toHaveBeenCalledOnce();
  });

  test("submitting empty form should show validation messages and focus first field: chain selector", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: { liquidSplitPct: 50, splitDisabled: false },
      recipient: { id: 0, name: "" },
      mode: "live",
    };

    const state: CryptoFormStep = {
      step: "donate-form",
      init,
    };
    render(<Form {...state} />);

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);

    expect(screen.getByText(/please select network/i)).toBeInTheDocument();
    //amount input
    expect(screen.getByText(/required/i)).toBeInTheDocument();

    //input is focused
    const comboboxInput = screen.getByRole("combobox");
    expect(comboboxInput).toHaveFocus();

    //dropdown is open
    const dropdown = screen.getByRole("listbox");
    expect(dropdown).toBeInTheDocument();
  });
});

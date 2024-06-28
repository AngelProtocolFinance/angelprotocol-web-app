import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { chains } from "constants/chains";
import * as apes from "services/apes";
import * as programs from "services/aws/programs";
import * as coingecko from "services/coingecko";
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

/** 
Mocking the `getBoundingClientRect` method for the virtual tests otherwise
the `Virtualizer` from `@tanstack/react-virtual` will not work as expected
because it couldn't measure the elements correctly. 
@see https://github.com/tailwindlabs/headlessui/blob/main/packages/%40headlessui-react/src/components/combobox/combobox.test.tsx
*/
vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(() => ({
  width: 120,
  height: 40,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  x: 0,
  y: 0,
  toJSON: () => {},
}));

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

vi.spyOn(coingecko, "useLazyTokenDetailsQuery").mockReturnValue([
  vi.fn().mockResolvedValue({
    unwrap: () => ({
      image: { thumb: "" },
      detail_platforms: { ethereum: { decimal_place: 18 } },
    }),
  }),
] as any);

// Mock useLazyUsdRateQuery
vi.spyOn(coingecko, "useLazyUsdRateQuery").mockReturnValue([
  vi.fn().mockResolvedValue({
    unwrap: () => 1,
  }),
] as any);

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

  test("user corrects error and submits", async () => {
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

    //submit empty form
    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);

    //combobox input should be focused and have options revealed
    const options = screen.getAllByRole("option");
    // option details best tested in some `ChainSelector.test.tsx`
    expect(options.length).toBeGreaterThan(0);

    //user clicks first option
    await userEvent.click(options[0]);
    //after selecting an option, error should go away
    //details of selected network best tested in some `ChainSelector.test.tsx`
    expect(screen.queryByText(/please select network/i)).toBeNull();

    await userEvent.click(continueBtn);

    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveFocus();

    await userEvent.type(amountInput, "10");
    //inputs amount but not selected token
    expect(screen.getByRole("paragraph")).toHaveTextContent(/select token/i);

    //user selects token
    const tokenSelector = screen.getByRole("button", { name: /select token/i });
    await userEvent.click(tokenSelector);

    const tokenOptions = screen.getAllByRole("option");
    // options details best tested in some `TokenSelector.test.tsx`
    expect(tokenOptions.length).toBeGreaterThan(0);

    //user clicks first option
    await userEvent.click(tokenOptions[0]); //mockToken[0]

    //details of selected token best tested in some `TokenSelector.test.tsx`
    //when selecting token, amount is reset to `""`, as different tokens have different nominal value
    expect(screen.getByText(/required/i)).toBeInTheDocument();

    //user now inputs amount but less than minimum
    await userEvent.click(amountInput);
    await userEvent.type(amountInput, "10");

    expect(screen.getByText(/must be at least 100/i)).toBeInTheDocument();

    //user now inputs amount greater than minimum
    await userEvent.click(amountInput);
    await userEvent.type(amountInput, "120");
    expect(screen.queryByText(/must be at least 100/i)).toBeNull();

    //user should be able to submit now
    await userEvent.click(continueBtn);
    //second click now
    expect(mockedSetState).toHaveBeenCalledTimes(2);
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { chains } from "constants/chains";
import { Provider } from "react-redux";
import { mockTokens } from "services/apes/mock";
import { mockPrograms } from "services/aws/programs";
import { store } from "store/store";
import { afterAll, describe, expect, test, vi } from "vitest";
import type { CryptoFormStep, Init } from "../../types";
import Form from "./Form";

const mockedSetState = vi.hoisted(() => vi.fn());
vi.mock("../../Context", () => ({
  useDonationState: vi
    .fn()
    .mockReturnValue({ state: {}, setState: mockedSetState }),
}));

const _Form: typeof Form = (props) => (
  <Provider store={store}>{<Form {...props} />}</Provider>
);

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
    render(<_Form {...state} />);

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
    render(<_Form {...state} />);
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
        token: { ...mockTokens[1], amount, min: 1 },
        program: { label: mockPrograms[0].title, value: mockPrograms[0].id },
      },
    } as const;
    render(<_Form {...state} />);

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
    mockedSetState.mockReset();
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
    render(<_Form {...state} />);

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
    render(<_Form {...state} />);

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
    expect(mockedSetState).toHaveBeenCalledOnce();
  });
});

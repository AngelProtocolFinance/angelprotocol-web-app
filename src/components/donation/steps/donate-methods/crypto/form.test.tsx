import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockTokens } from "services/apes/mock";
import { mockPrograms } from "services/aws/programs/mock";
import { afterAll, describe, expect, test, vi } from "vitest";
import { testDonateData } from "../../__tests__/test-data";
import type { CryptoFormStep, Init } from "../../types";
import Form from "./form";

const mockedSetState = vi.hoisted(() => vi.fn());
vi.mock("../../context", () => ({
  useDonationState: vi
    .fn()
    .mockReturnValue({ state: {}, setState: mockedSetState }),
}));

vi.mock("@remix-run/react", async () => {
  const actual = await vi.importActual("@remix-run/react");
  return {
    ...actual,
    useLoaderData: () => testDonateData,
  };
});

describe("Crypto form: initial load", () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("initial form state: no persisted details", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
      mode: "live",
    };

    const state: CryptoFormStep = {
      step: "donate-form",
      init,
    };
    render(<Form {...state} />);

    waitFor(() => {
      const programSelector = screen.queryByLabelText(/select program/i);
      expect(programSelector).toBeNull();
    });
  });

  test("initial form state: program donations not allowed", () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: {
        id: "0",
        name: "",
        progDonationsAllowed: false,
        members: [],
      },
      mode: "live",
    };

    const state: CryptoFormStep = {
      step: "donate-form",
      init,
    };
    render(<Form {...state} />);
    waitFor(() => {
      const programSelector = screen.queryByRole("button", {
        name: /general donation/i,
      });
      expect(programSelector).toBeNull();
    });
  });

  test("submit form with initial/persisted data", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
      mode: "live",
    };

    const amount = "100.33";
    const state: CryptoFormStep = {
      step: "donate-form",
      init,
      details: {
        method: "crypto",
        token: { ...mockTokens[1], amount, min: 1, rate: 1 },
        program: { label: mockPrograms[0].title, value: mockPrograms[0].id },
      },
    } as const;
    render(<Form {...state} />);

    const amountInput = screen.getByDisplayValue(amount);
    expect(amountInput).toBeInTheDocument();

    const selectedProgram = screen.getByText(/program 1/i);
    expect(selectedProgram).toBeInTheDocument();

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);
    expect(mockedSetState).toHaveBeenCalledOnce();
    mockedSetState.mockReset();
  });

  test("submitting empty form should show validation messages and focus first field: amount input", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
      mode: "live",
    };

    const state: CryptoFormStep = {
      step: "donate-form",
      init,
    };
    render(<Form {...state} />);

    const continueBtn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continueBtn);

    //amount input
    expect(screen.getByText(/required/i)).toBeInTheDocument();

    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveFocus();
  });

  test("user corrects error and submits", async () => {
    const init: Init = {
      source: "bg-marketplace",
      config: null,
      recipient: { id: "0", name: "", members: [] },
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

    //amount input required and focused
    expect(screen.getByText(/required/i)).toBeInTheDocument();
    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    expect(amountInput).toHaveFocus();

    //inputs amount but not selected token
    await userEvent.type(amountInput, "10");
    await userEvent.click(continueBtn);
    //inputs amount but not selected token
    expect(screen.getByRole("paragraph")).toHaveTextContent(/select token/i);

    //user selects token
    const tokenSelector = screen.getByRole("button", { name: /select token/i });
    await userEvent.click(tokenSelector);

    const tokenOptions = screen.getAllByRole("option");
    // options details best tested in some `TokenSelector.test.tsx`
    expect(tokenOptions.length).toBeGreaterThan(0);

    //user clicks first option
    await userEvent.click(tokenOptions[0]); //Bitcoin

    //token is loading, to get min amount

    //details of selected token best tested in some `TokenSelector.test.tsx`
    //when selecting token, amount is reset to `""`, as different tokens have different nominal value
    expect(screen.getByText(/required/i)).toBeInTheDocument();

    //user now inputs amount but less than minimum
    await userEvent.click(amountInput);
    await userEvent.type(amountInput, "0.5");

    expect(await screen.findByText(/less than minimum/i)).toBeInTheDocument();

    //user now inputs amount greater than minimum
    await userEvent.click(amountInput);
    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, "2");
    expect(screen.queryByText(/less than minimum/i)).toBeNull();

    //user should be able to submit now
    await userEvent.click(continueBtn);
    //second click now
    expect(mockedSetState).toHaveBeenCalledOnce();
  });
});

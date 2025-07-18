import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { stb } from "./__tests__/test-data";
import { DEFAULT_PROGRAM } from "./common/constants";
import { Steps } from "./index";
import type { DonationState, StripeDonationDetails } from "./types";

const stripeDonation: StripeDonationDetails = {
  method: "stripe",
  amount: "100",
  currency: { code: "usd", min: 1, rate: 1 },
  frequency: "recurring",
  program: DEFAULT_PROGRAM,
};

describe("donation flow", () => {
  test("split is skipped", async () => {
    const state: DonationState = {
      step: "donate-form",
      init: {
        recipient: { id: "1", name: "test", members: [] },
        source: "bg-marketplace",
        mode: "live",
        config: null,
      },
      details: stripeDonation,
    };
    const Stub = stb(<Steps init={state} />);
    render(<Stub />);

    const continueBtn = await screen.findByRole("button", {
      name: /continue/i,
    });
    await userEvent.click(continueBtn);

    const tipForm = screen.getByTestId("tip-form");
    expect(tipForm).toBeInTheDocument();

    //clicking back goes back to donate form
    const backBtn = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(backBtn);

    const donateMethods = screen.getByTestId("donate-methods");
    expect(donateMethods).toBeInTheDocument();
  });

  test("tipping is skipped", async () => {
    const state: DonationState = {
      step: "donate-form",
      init: {
        recipient: { id: "1", name: "test", hide_bg_tip: true, members: [] },
        source: "bg-marketplace",
        mode: "live",
        config: null,
      },
      details: stripeDonation,
    };
    const Stub = stb(<Steps init={state} />);
    render(<Stub />);

    await userEvent.click(
      await screen.findByRole("button", {
        name: /continue/i,
      })
    );

    expect(
      screen.getByRole("button", { name: /checkout/i })
    ).toBeInTheDocument();

    //user back on donate methods
    await userEvent.click(
      screen.getByRole("button", {
        name: /go back/i,
      })
    );

    expect(screen.getByTestId("donate-methods")).toBeInTheDocument();
  });

  test("tip is reset when changing token/currency", async () => {
    const state: DonationState = {
      step: "tip",
      init: {
        recipient: { id: "1", name: "test", members: [] },
        source: "bg-marketplace",
        mode: "live",
        config: null,
      },
      details: stripeDonation,
      tip: { value: 50, format: "pct" },
    };

    const Stub = stb(<Steps init={state} />);
    render(<Stub />);

    // back to donate methods
    await userEvent.click(
      await screen.findByRole("button", {
        name: /go back/i,
      })
    );

    const currencySelector = await screen.findByRole("combobox");
    await userEvent.click(currencySelector);
    await userEvent.clear(currencySelector);
    await userEvent.type(currencySelector, "EUR");

    const eurOption = screen.getByRole("option", { name: /eur/i });
    await userEvent.click(eurOption);
    //amount is the same

    //continue to tips
    await userEvent.click(
      screen.getByRole("button", {
        name: /continue/i,
      })
    );

    //tip is reverted to 17%
    const tipSlider = screen.getByRole("slider");
    expect(tipSlider).toHaveAttribute("aria-valuenow", "0.17");
  });

  test("tip, split reset when changing donation method", async () => {
    const state: DonationState = {
      step: "tip",
      init: {
        recipient: { id: "1", name: "test", members: [] },
        source: "bg-marketplace",
        mode: "live",
        config: null,
      },
      details: stripeDonation,
      tip: { value: 50, format: "pct" },
    };

    const Stub = stb(<Steps init={state} />);
    render(<Stub />);

    // back to donate methods
    await userEvent.click(
      await screen.findByRole("button", {
        name: /go back/i,
      })
    );

    //select crypto
    const cryptoTab = screen.getByRole("tab", { name: /crypto/i });
    await userEvent.click(cryptoTab);

    //select token
    const tokenSelectorOpener = screen.getByRole("button", {
      name: /select token/i,
    });
    await userEvent.click(tokenSelectorOpener);
    //wait for token dropdown to load
    const tokenSearchInput = await screen.findByPlaceholderText("Search...");
    await userEvent.click(tokenSearchInput);
    const tokenOptions = screen.getAllByRole("option");
    await userEvent.click(tokenOptions[0]);

    //input amount
    const amountInput = screen.getByPlaceholderText(/enter amount/i);
    await userEvent.type(amountInput, "150");

    //continue to tip
    await userEvent.click(
      screen.getByRole("button", {
        name: /continue/i,
      })
    );

    //tip is reverted to 17%
    const tipSlider = screen.getByRole("slider");
    expect(tipSlider).toHaveAttribute("aria-valuenow", "0.17");
  });
});

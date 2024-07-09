import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "store/store";
import { describe, expect, test } from "vitest";
import { DEFAULT_PROGRAM } from "./common/constants";
import { Steps } from "./index";
import type { DonationState, StripeDonationDetails } from "./types";

const _Steps: typeof Steps = (props) => (
  <Provider store={store}>{<Steps {...props} />}</Provider>
);

const stripeDonation: StripeDonationDetails = {
  method: "stripe",
  amount: "100",
  currency: { code: "usd", min: 1, rate: 1 },
  frequency: "subscription",
  program: DEFAULT_PROGRAM,
};

describe("donation flow", () => {
  test("split is skipped", async () => {
    const state: DonationState = {
      step: "donate-form",
      init: {
        recipient: { id: 1, name: "test" },
        source: "bg-marketplace",
        mode: "live",
        config: { splitDisabled: true, liquidSplitPct: 50 },
      },
      details: stripeDonation,
    };
    render(<_Steps init={state} />);

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
        recipient: { id: 1, name: "test", hide_bg_tip: true },
        source: "bg-marketplace",
        mode: "live",
        config: null,
      },
      details: stripeDonation,
    };
    render(<_Steps init={state} />);

    await userEvent.click(
      await screen.findByRole("button", {
        name: /continue/i,
      })
    );

    expect(screen.getByTestId("split-step")).toBeInTheDocument();
    await userEvent.click(
      screen.getByRole("button", {
        name: /continue/i,
      })
    );

    expect(
      screen.getByRole("button", { name: /checkout/i })
    ).toBeInTheDocument();

    //user back on splits step
    await userEvent.click(
      screen.getByRole("button", {
        name: /go back/i,
      })
    );
    expect(screen.getByTestId("split-step")).toBeInTheDocument();

    //user back on donate methods
    await userEvent.click(
      screen.getByRole("button", {
        name: /go back/i,
      })
    );
    expect(screen.getByTestId("donate-methods")).toBeInTheDocument();
  });

  test("tipping and splits is skipped", async () => {
    const state: DonationState = {
      step: "donate-form",
      init: {
        recipient: { id: 1, name: "test", hide_bg_tip: true },
        source: "bg-marketplace",
        mode: "live",
        config: { splitDisabled: true, liquidSplitPct: 50 },
      },
      details: stripeDonation,
    };
    render(<_Steps init={state} />);

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
        recipient: { id: 1, name: "test" },
        source: "bg-marketplace",
        mode: "live",
        config: null,
      },
      details: stripeDonation,
      liquidSplitPct: 63,
      tip: { value: 50, format: "pct" },
    };

    render(<_Steps init={state} />);

    //back to splits
    await userEvent.click(
      screen.getByRole("button", {
        name: /go back/i,
      })
    );
    // back to donate methods
    await userEvent.click(
      screen.getByRole("button", {
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

    //continue to splits
    await userEvent.click(
      screen.getByRole("button", {
        name: /continue/i,
      })
    );

    //split should still be the same
    const liqSplitSlider = screen.getByRole("slider");
    expect(liqSplitSlider).toHaveAttribute("aria-valuenow", "37");

    //continue to splits
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
        recipient: { id: 1, name: "test" },
        source: "bg-marketplace",
        mode: "live",
        config: null,
      },
      details: stripeDonation,
      liquidSplitPct: 63,
      tip: { value: 50, format: "pct" },
    };

    render(<_Steps init={state} />);

    //back to splits
    await userEvent.click(
      screen.getByRole("button", {
        name: /go back/i,
      })
    );
    // back to donate methods
    await userEvent.click(
      screen.getByRole("button", {
        name: /go back/i,
      })
    );

    //select crypto
    const cryptoTab = screen.getByRole("tab", { name: /crypto/i });
    await userEvent.click(cryptoTab);

    //select network
    const networkSelector = screen.getByRole("combobox");
    await userEvent.click(networkSelector);
    const networkOptions = screen.getAllByRole("option");
    await userEvent.click(networkOptions[0]);

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

    //continue to splits
    await userEvent.click(
      screen.getByRole("button", {
        name: /continue/i,
      })
    );

    //split reset to 50%
    const liqSplitSlider = screen.getByRole("slider");
    expect(liqSplitSlider).toHaveAttribute("aria-valuenow", "50");

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

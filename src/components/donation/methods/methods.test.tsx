import type { DonateMethodId } from "@better-giving/endowment";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { donor_fv_blank } from "lib/donations/schema";
import { describe, expect, test } from "vitest";
import { Steps } from "../index";
import { type Config, type TDonation, donation_recipient_init } from "../types";
import { stb } from "./__tests__/test-data";

describe("payment method form state persistence", () => {
  const all_methods_config: Config = {
    success_redirect: undefined,
    method_ids: ["stripe", "crypto", "daf", "stocks"] as DonateMethodId[],
    id: null,
  };

  test("crypto: form state persists when navigating to checkout and back", async () => {
    const init: TDonation = {
      base_url: "",
      source: "bg-marketplace",
      mode: "live",
      recipient: donation_recipient_init({ hide_bg_tip: true }),
      donor: donor_fv_blank,
      config: all_methods_config,
      method: "crypto",
    };
    const Stub = stb(<Steps init={init} />);
    render(<Stub />);

    // Wait for donate-methods to render
    await screen.findByTestId("donate-methods");

    // Select crypto tab
    const crypto_tab = screen.getByRole("tab", { name: /crypto/i });
    await userEvent.click(crypto_tab);

    // Select token
    const token_selector = screen.getByRole("combobox");
    await userEvent.click(token_selector);
    const token_options = screen.getAllByRole("option");
    await userEvent.click(token_options[0]);

    // Input amount
    const amount_input = screen.getByPlaceholderText(/enter amount/i);
    await userEvent.type(amount_input, "2");

    // Submit to donor step
    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    // Should be on donor step now - fill donor info
    const email_input = await screen.findByPlaceholderText(/john@doe\.com/i);
    await userEvent.type(email_input, "john@doe.com");

    const first_name_input = screen.getByRole("textbox", {
      name: /first name/i,
    });
    await userEvent.type(first_name_input, "John");

    const last_name_input = screen.getByRole("textbox", { name: /last name/i });
    await userEvent.type(last_name_input, "Doe");

    // Continue to checkout
    const continue_btn2 = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn2);

    // Should be on checkout page - look for crypto-specific button
    expect(
      await screen.findByRole("button", {
        name: /i have completed the payment/i,
      })
    ).toBeInTheDocument();

    // Go back to donor step
    const back_btn = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn);

    // Verify donor state persists
    expect(
      await screen.findByPlaceholderText(/john@doe\.com/i)
    ).toHaveDisplayValue("john@doe.com");
    expect(
      screen.getByRole("textbox", { name: /first name/i })
    ).toHaveDisplayValue("John");
    expect(
      screen.getByRole("textbox", { name: /last name/i })
    ).toHaveDisplayValue("Doe");

    // Go back to form
    const back_btn2 = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn2);

    // Verify form state persists
    expect(
      await screen.findByPlaceholderText(/enter amount/i)
    ).toHaveDisplayValue("2");
  });

  test("daf: form state persists when navigating to checkout and back", async () => {
    const init: TDonation = {
      base_url: "",
      source: "bg-marketplace",
      mode: "live",
      recipient: donation_recipient_init({ hide_bg_tip: true }),
      donor: donor_fv_blank,
      config: all_methods_config,
      method: "daf",
    };
    const Stub = stb(<Steps init={init} />);
    render(<Stub />);

    // Wait for donate-methods to render
    await screen.findByTestId("donate-methods");

    // Select DAF tab
    const daf_tab = screen.getByRole("tab", { name: /donor advised fund/i });
    await userEvent.click(daf_tab);

    // input amount
    const amount_input = screen.getByPlaceholderText(/enter amount/i);
    await userEvent.type(amount_input, "500");

    // submit directly to checkout (donor step is skipped)
    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    // should be on checkout page - daf uses chariot widget, check we left the form
    expect(screen.queryByTestId("donate-methods")).not.toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /go back/i })
    ).toBeInTheDocument();

    // go back to form (donor step is skipped)
    const back_btn = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn);

    // verify form state persists
    expect(
      await screen.findByPlaceholderText(/enter amount/i)
    ).toHaveDisplayValue("500");
  });

  test("stocks: form state persists when navigating to checkout and back", async () => {
    const init: TDonation = {
      base_url: "",
      source: "bg-marketplace",
      mode: "live",
      recipient: donation_recipient_init({ hide_bg_tip: true }),
      donor: donor_fv_blank,
      config: all_methods_config,
      method: "stocks",
    };
    const Stub = stb(<Steps init={init} />);
    render(<Stub />);

    // Wait for donate-methods to render
    await screen.findByTestId("donate-methods");

    // Select stocks tab
    const stocks_tab = screen.getByRole("tab", { name: /stocks/i });
    await userEvent.click(stocks_tab);

    // Select ticker
    const ticker_selector = screen.getByRole("combobox");
    await userEvent.click(ticker_selector);
    const ticker_options = screen.getAllByRole("option");
    await userEvent.click(ticker_options[0]);

    // Input amount
    const amount_input = screen.getByPlaceholderText(/enter amount/i);
    await userEvent.type(amount_input, "10");

    // submit directly to checkout (donor step is skipped)
    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    // should be on checkout page - look for stocks-specific text
    expect(await screen.findByText(/donation pending/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /generate email/i })
    ).toBeInTheDocument();

    // go back to form (donor step is skipped)
    const back_btn = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn);

    // verify form state persists
    expect(
      await screen.findByPlaceholderText(/enter amount/i)
    ).toHaveDisplayValue("10");
  });

  test("form state persists when switching between payment methods after checkout", async () => {
    const init: TDonation = {
      base_url: "",
      source: "bg-marketplace",
      mode: "live",
      recipient: donation_recipient_init({ hide_bg_tip: true }),
      donor: donor_fv_blank,
      config: all_methods_config,
      method: "crypto",
    };
    const Stub = stb(<Steps init={init} />);
    render(<Stub />);

    // Wait for donate-methods to render
    await screen.findByTestId("donate-methods");

    // Fill crypto form
    const crypto_tab = screen.getByRole("tab", { name: /crypto/i });
    await userEvent.click(crypto_tab);

    const token_selector = screen.getByRole("combobox");
    await userEvent.click(token_selector);
    const token_options = screen.getAllByRole("option");
    await userEvent.click(token_options[0]);

    let amount_input = screen.getByPlaceholderText(/enter amount/i);
    await userEvent.type(amount_input, "5");

    // Submit to donor step
    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    // Fill donor info
    const email_input = await screen.findByPlaceholderText(/john@doe\.com/i);
    await userEvent.type(email_input, "alice@example.com");

    const first_name_input = screen.getByRole("textbox", {
      name: /first name/i,
    });
    await userEvent.type(first_name_input, "Alice");

    const last_name_input = screen.getByRole("textbox", { name: /last name/i });
    await userEvent.type(last_name_input, "Smith");

    // Submit to checkout to persist state in context
    const continue_btn2 = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn2);

    // Should be on checkout page
    expect(
      await screen.findByRole("button", {
        name: /i have completed the payment/i,
      })
    ).toBeInTheDocument();

    // Go back to donor step
    const back_btn = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn);

    // Verify donor info persists, then go back to form
    expect(
      await screen.findByPlaceholderText(/john@doe\.com/i)
    ).toHaveDisplayValue("alice@example.com");
    const back_btn2 = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn2);

    // switch to daf (tabs should already be rendered)
    const daf_tab = screen.getByRole("tab", { name: /donor advised fund/i });
    await userEvent.click(daf_tab);

    // fill daf form
    amount_input = screen.getByPlaceholderText(/enter amount/i);
    await userEvent.type(amount_input, "1000");

    // submit directly to checkout (donor step is skipped for daf)
    const continue_btn3 = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn3);

    // should be on daf checkout
    expect(screen.queryByTestId("donate-methods")).not.toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /go back/i })
    ).toBeInTheDocument();

    // go back to form (donor step is skipped for daf)
    const back_btn3 = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn3);

    // switch back to crypto - form state should persist (tabs already rendered)
    const crypto_tab2 = screen.getByRole("tab", { name: /crypto/i });
    await userEvent.click(crypto_tab2);

    expect(screen.getByPlaceholderText(/enter amount/i)).toHaveDisplayValue(
      "5"
    );

    // Switch back to DAF - form state should persist
    const daf_tab2 = screen.getByRole("tab", { name: /donor advised fund/i });
    await userEvent.click(daf_tab2);

    expect(screen.getByPlaceholderText(/enter amount/i)).toHaveDisplayValue(
      "1000"
    );
  });

  test("form state persists after going to checkout from one method and switching to another", async () => {
    const init: TDonation = {
      base_url: "",
      source: "bg-marketplace",
      mode: "live",
      recipient: donation_recipient_init({ hide_bg_tip: true }),
      donor: donor_fv_blank,
      config: all_methods_config,
      method: "crypto",
    };
    const Stub = stb(<Steps init={init} />);
    render(<Stub />);

    // Wait for donate-methods to render
    await screen.findByTestId("donate-methods");

    // Fill and submit crypto form to checkout - this persists state in context
    const crypto_tab = screen.getByRole("tab", { name: /crypto/i });
    await userEvent.click(crypto_tab);

    const token_selector = screen.getByRole("combobox");
    await userEvent.click(token_selector);
    const token_options = screen.getAllByRole("option");
    await userEvent.click(token_options[0]);

    let amount_input = screen.getByPlaceholderText(/enter amount/i);
    await userEvent.type(amount_input, "2");

    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    // Fill donor info
    const email_input = await screen.findByPlaceholderText(/john@doe\.com/i);
    await userEvent.type(email_input, "bob@example.com");

    const first_name_input = screen.getByRole("textbox", {
      name: /first name/i,
    });
    await userEvent.type(first_name_input, "Bob");

    const last_name_input = screen.getByRole("textbox", { name: /last name/i });
    await userEvent.type(last_name_input, "Johnson");

    const continue_btn2 = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn2);

    // Should be on crypto checkout
    expect(
      await screen.findByRole("button", {
        name: /i have completed the payment/i,
      })
    ).toBeInTheDocument();

    // Go back to donor step
    const back_btn = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn);

    // Go back to form
    const back_btn2 = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn2);

    // wait for donate-methods to render again
    await screen.findByTestId("donate-methods");

    // fill daf form and go to checkout - this also persists daf state in context (tabs already rendered)
    const daf_tab = screen.getByRole("tab", {
      name: /donor advised fund/i,
    });
    await userEvent.click(daf_tab);

    amount_input = screen.getByPlaceholderText(/enter amount/i);
    await userEvent.type(amount_input, "750");

    // submit directly to checkout (donor step is skipped for daf)
    const continue_btn3 = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn3);

    // should be on daf checkout - check we left the form
    expect(screen.queryByTestId("donate-methods")).not.toBeInTheDocument();

    // go back to form (donor step is skipped for daf)
    const back_btn3 = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn3);

    // switch back to crypto - all form state should persist from context (tabs already rendered)
    const crypto_tab2 = screen.getByRole("tab", { name: /crypto/i });
    await userEvent.click(crypto_tab2);

    expect(screen.getByPlaceholderText(/enter amount/i)).toHaveDisplayValue(
      "2"
    );
  });
});

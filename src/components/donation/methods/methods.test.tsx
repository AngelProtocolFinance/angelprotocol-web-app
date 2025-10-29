import type { DonateMethodId } from "@better-giving/endowment";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { Steps } from "../index";
import type { Config, TDonation } from "../types";
import { stb } from "./__tests__/test-data";

describe("payment method form state persistence", () => {
  const all_methods_config: Config = {
    method_ids: ["stripe", "crypto", "daf", "stocks"] as DonateMethodId[],
  };

  test("crypto: form state persists when navigating to checkout and back", async () => {
    const init: TDonation = {
      source: "bg-marketplace",
      mode: "live",
      recipient: { id: "1", name: "test", members: [], hide_bg_tip: true },
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

    // Fill donor info
    const first_name_input = screen.getByPlaceholderText(/first name/i);
    await userEvent.type(first_name_input, "John");

    const last_name_input = screen.getByPlaceholderText(/last name/i);
    await userEvent.type(last_name_input, "Doe");

    const email_input = screen.getByPlaceholderText(/email/i);
    await userEvent.type(email_input, "john@doe.com");

    // Submit to checkout
    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    // Should be on checkout page - look for crypto-specific button
    expect(
      await screen.findByRole("button", {
        name: /i have completed the payment/i,
      })
    ).toBeInTheDocument();

    // Go back
    const back_btn = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn);

    // Verify form state persists
    expect(screen.getByPlaceholderText(/enter amount/i)).toHaveDisplayValue(
      "2"
    );
    expect(screen.getByPlaceholderText(/first name/i)).toHaveDisplayValue(
      "John"
    );
    expect(screen.getByPlaceholderText(/last name/i)).toHaveDisplayValue("Doe");
    expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue(
      "john@doe.com"
    );
  });

  test("daf: form state persists when navigating to checkout and back", async () => {
    const init: TDonation = {
      source: "bg-marketplace",
      mode: "live",
      recipient: { id: "1", name: "test", members: [], hide_bg_tip: true },
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

    // Input amount
    const amount_input = screen.getByPlaceholderText(/enter amount/i);
    await userEvent.type(amount_input, "500");

    // Submit to checkout
    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    // Should be on checkout page - DAF uses Chariot widget, check we left the form
    expect(screen.queryByTestId("donate-methods")).not.toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /go back/i })
    ).toBeInTheDocument();

    // Go back
    const back_btn = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn);

    // Verify form state persists
    expect(screen.getByPlaceholderText(/enter amount/i)).toHaveDisplayValue(
      "500"
    );
  });

  test("stocks: form state persists when navigating to checkout and back", async () => {
    const init: TDonation = {
      source: "bg-marketplace",
      mode: "live",
      recipient: { id: "1", name: "test", members: [], hide_bg_tip: true },
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

    // Input symbol
    const symbol_input = screen.getByPlaceholderText(/ex. aapl/i);
    await userEvent.type(symbol_input, "AAPL");

    // Input quantity
    const qty_input = screen.getByPlaceholderText(/enter quantity/i);
    await userEvent.type(qty_input, "10");

    // Submit to checkout
    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    // Should be on checkout page - look for stocks-specific text
    expect(await screen.findByText(/donation pending/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /generate email/i })
    ).toBeInTheDocument();

    // Go back
    const back_btn = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn);

    // Verify form state persists
    expect(screen.getByPlaceholderText(/ex. aapl/i)).toHaveDisplayValue("AAPL");
    expect(screen.getByPlaceholderText(/enter quantity/i)).toHaveDisplayValue(
      "10"
    );
  });

  test("form state persists when switching between payment methods after checkout", async () => {
    const init: TDonation = {
      source: "bg-marketplace",
      mode: "live",
      recipient: { id: "1", name: "test", members: [], hide_bg_tip: true },
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

    const first_name_input = screen.getByPlaceholderText(/first name/i);
    await userEvent.type(first_name_input, "Alice");

    const last_name_input = screen.getByPlaceholderText(/last name/i);
    await userEvent.type(last_name_input, "Smith");

    const email_input = screen.getByPlaceholderText(/email/i);
    await userEvent.type(email_input, "alice@example.com");

    // Submit to checkout to persist state in context
    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    // Should be on checkout page
    expect(
      await screen.findByRole("button", {
        name: /i have completed the payment/i,
      })
    ).toBeInTheDocument();

    // Go back
    const back_btn = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn);

    // Switch to DAF
    const daf_tab = screen.getByRole("tab", { name: /donor advised fund/i });
    await userEvent.click(daf_tab);

    // Fill DAF form
    amount_input = screen.getByPlaceholderText(/enter amount/i);
    await userEvent.type(amount_input, "1000");

    // Submit to checkout to persist state in context
    const continue_btn2 = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn2);

    // Should be on DAF checkout
    expect(screen.queryByTestId("donate-methods")).not.toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /go back/i })
    ).toBeInTheDocument();

    // Go back
    const back_btn2 = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn2);

    // Switch back to crypto - form state should persist
    const crypto_tab2 = screen.getByRole("tab", { name: /crypto/i });
    await userEvent.click(crypto_tab2);

    expect(screen.getByPlaceholderText(/enter amount/i)).toHaveDisplayValue(
      "5"
    );
    expect(screen.getByPlaceholderText(/first name/i)).toHaveDisplayValue(
      "Alice"
    );
    expect(screen.getByPlaceholderText(/last name/i)).toHaveDisplayValue(
      "Smith"
    );
    expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue(
      "alice@example.com"
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
      source: "bg-marketplace",
      mode: "live",
      recipient: { id: "1", name: "test", members: [], hide_bg_tip: true },
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
    await userEvent.type(amount_input, "3");

    const first_name_input = screen.getByPlaceholderText(/first name/i);
    await userEvent.type(first_name_input, "Bob");

    const last_name_input = screen.getByPlaceholderText(/last name/i);
    await userEvent.type(last_name_input, "Johnson");

    const email_input = screen.getByPlaceholderText(/email/i);
    await userEvent.type(email_input, "bob@example.com");

    const continue_btn = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn);

    // Should be on crypto checkout
    expect(
      await screen.findByRole("button", {
        name: /i have completed the payment/i,
      })
    ).toBeInTheDocument();

    // Go back
    const back_btn = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn);

    // Wait for donate-methods to render again
    await screen.findByTestId("donate-methods");

    // Fill DAF form and go to checkout - this also persists DAF state in context
    const daf_tab = await screen.findByRole("tab", {
      name: /donor advised fund/i,
    });
    await userEvent.click(daf_tab);

    amount_input = screen.getByPlaceholderText(/enter amount/i);
    await userEvent.type(amount_input, "750");

    const continue_btn2 = screen.getByRole("button", { name: /continue/i });
    await userEvent.click(continue_btn2);

    // Should be on DAF checkout - check we left the form
    expect(screen.queryByTestId("donate-methods")).not.toBeInTheDocument();

    // Go back
    const back_btn2 = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(back_btn2);

    // Switch back to crypto - all form state should persist from context
    const crypto_tab2 = screen.getByRole("tab", { name: /crypto/i });
    await userEvent.click(crypto_tab2);

    expect(screen.getByPlaceholderText(/enter amount/i)).toHaveDisplayValue(
      "3"
    );
    expect(screen.getByPlaceholderText(/first name/i)).toHaveDisplayValue(
      "Bob"
    );
    expect(screen.getByPlaceholderText(/last name/i)).toHaveDisplayValue(
      "Johnson"
    );
    expect(screen.getByPlaceholderText(/email/i)).toHaveDisplayValue(
      "bob@example.com"
    );
  });
});

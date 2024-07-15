import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "store/store";
import { describe, expect, test, vi } from "vitest";
import { initTokenOption } from "../common/constants";
import type {
  CryptoDonationDetails,
  StripeDonationDetails,
  SummaryStep,
} from "../types";
import Summary from "./Summary";

vi.mock("../Context", () => ({
  useDonationState: vi.fn().mockReturnValue({ state: {}, setState: vi.fn() }),
}));

const mockUseGetter = vi.hoisted(() => vi.fn());
vi.mock("store/accessors", () => ({
  useGetter: mockUseGetter,
}));

const oneTimeStripeDetails: StripeDonationDetails = {
  method: "stripe",
  frequency: "one-time",
  amount: "100.00",
  currency: { code: "usd", min: 1, rate: 1 },
  program: { value: "prog_789", label: "Education Initiative" },
};

const props: SummaryStep = {
  step: "summary",
  init: {
    source: "bg-marketplace",
    mode: "live",
    recipient: { id: 1, name: "Example Charity" },
    config: null,
  },
  details: oneTimeStripeDetails,
  liquidSplitPct: 80,
};

const coverFeeCheckboxLabel =
  /cover payment processing fees for your donation \( example charity receives the full amount \)/i;

describe("summary items", () => {
  test("donation amount text if no tip", () => {
    render(<Summary {...props} />);
    const totalRow = screen.getByRole("term", { name: /amount/i });
    expect(totalRow).toHaveTextContent(/total donation/i);
  });
  test("donation amount text with tip", () => {
    render(<Summary {...props} tip={{ value: 17, format: "pct" }} />);
    const totalRow = screen.getByRole("term", { name: /amount/i });
    expect(totalRow).toHaveTextContent(/donation for example charity/i);
  });
  test("total amount text - one time", () => {
    render(<Summary {...props} />);
    const totalRow = screen.getByRole("term", { name: /total/i });
    expect(totalRow).toHaveTextContent(/total charge/i);
  });

  const subsStripeDetails: StripeDonationDetails = {
    ...oneTimeStripeDetails,
    frequency: "subscription",
  };
  test("total amount text - subscription", () => {
    render(<Summary {...props} details={subsStripeDetails} />);
    const totalRow = screen.getByRole("term", { name: /total/i });
    expect(totalRow).toHaveTextContent(/total monthly charge/i);
  });

  test("if fee allowance is previously set, cover fee checkbox must be checked", () => {
    render(<Summary {...props} feeAllowance={2} />);

    const coverFeeCheckbox = screen.getByLabelText(coverFeeCheckboxLabel);
    expect(coverFeeCheckbox).toBeChecked();

    //processing fee row is not shown in summary step
    expect(screen.queryByRole("term", { name: /fee allowance/i })).toBeNull();
  });
  test("fee allowance not previously set", () => {
    render(<Summary {...props} />);

    const coverFeeCheckbox = screen.getByLabelText(coverFeeCheckboxLabel);
    expect(coverFeeCheckbox).not.toBeChecked();
  });

  test("only amount row and total row", () => {
    render(<Summary {...props} liquidSplitPct={100} />);
    expect(screen.getByRole("term", { name: /amount/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("term", { name: /sustainability fund/i })
    ).toBeNull();
    expect(screen.queryByRole("term", { name: /direct donation/i })).toBeNull();
    expect(screen.queryByRole("term", { name: /tip/i })).toBeNull();
    expect(screen.getByRole("term", { name: /total/i })).toBeInTheDocument();
  });
  test("with tip row: and effect to total", () => {
    render(
      <Summary
        {...props}
        liquidSplitPct={100}
        tip={{ value: 17, format: "amount" }}
      />
    );
    expect(screen.getByRole("term", { name: /amount/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("term", { name: /sustainability fund/i })
    ).toBeNull();
    expect(screen.queryByRole("term", { name: /direct donation/i })).toBeNull();

    const tipTerm = screen.getByRole("term", { name: /tip/i });
    expect(tipTerm).toBeInTheDocument();
    expect(tipTerm.nextSibling).toHaveTextContent(/\$17/i);

    const totalTerm = screen.getByRole("term", { name: /total/i });
    expect(totalTerm).toBeInTheDocument();
    expect(totalTerm.nextSibling).toHaveTextContent(/\$117/i);
  });
  test("with tip, splits rows", () => {
    render(
      <Summary
        {...props}
        liquidSplitPct={60}
        tip={{ value: 17, format: "amount" }}
      />
    );
    expect(screen.getByRole("term", { name: /amount/i })).toBeInTheDocument();

    const lockTerm = screen.getByRole("term", { name: /sustainability fund/i });
    expect(lockTerm).toBeInTheDocument();
    //dt is enclosed by div
    expect(lockTerm.parentNode?.nextSibling).toHaveTextContent(/\$40/i);

    const liqTerm = screen.getByRole("term", { name: /direct donation/i });
    expect(liqTerm).toBeInTheDocument();
    expect(liqTerm.nextSibling).toHaveTextContent(/\$60/i);

    expect(screen.getByRole("term", { name: /tip/i })).toBeInTheDocument();
    expect(screen.getByRole("term", { name: /total/i })).toBeInTheDocument();

    expect(screen.getByLabelText(coverFeeCheckboxLabel)).not.toBeChecked();
  });

  const cryptoDetails: CryptoDonationDetails = {
    method: "crypto",
    chainId: "80002",
    token: { ...initTokenOption, amount: "100", coingecko_denom: "wagmi" },
    program: props.details.program,
  };
  test("crypto amount + dollar amount", async () => {
    render(
      <Provider store={store}>
        <Summary {...props} details={cryptoDetails} />
      </Provider>
    );

    const donationTerm = screen.getByRole("term", { name: /amount/i });
    expect(donationTerm).toBeInTheDocument();
    //dollar amount is loading
    expect(donationTerm.nextSibling).toHaveTextContent("100.0000 ($--)");
    //dollar amount is loaded

    await new Promise((r) => setTimeout(r, 50));
    expect(donationTerm.nextSibling).toHaveTextContent("100.0000 ($100.00)");
  });
});

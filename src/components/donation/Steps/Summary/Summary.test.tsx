import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "store/store";
import type { AuthenticatedUser } from "types/auth";
import { describe, expect, test, vi } from "vitest";
import { initTokenOption } from "../common/constants";
import type {
  CryptoDonationDetails,
  FormDonor,
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

const donor: FormDonor = {
  email: "john@doe.com",
  firstName: "John",
  lastName: "Doe",
  ukTaxResident: false,
  title: { value: "Mr", label: "Mr" },
  zipCode: "12345",
  streetAddress: "123 Main St, Anytown, USA",
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
};

const coverFeeCheckboxLabel =
  /cover payment processing fees for your donation \( example charity receives the full amount \)/i;

describe("summary step", () => {
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
    render(<Summary {...props} />);
    expect(screen.getByRole("term", { name: /amount/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("term", { name: /sustainability fund/i })
    ).toBeNull();
    expect(screen.queryByRole("term", { name: /direct donation/i })).toBeNull();
    expect(screen.queryByRole("term", { name: /tip/i })).toBeNull();
    expect(screen.getByRole("term", { name: /total/i })).toBeInTheDocument();
  });
  test("with tip row: and effect to total", () => {
    render(<Summary {...props} tip={{ value: 17, format: "amount" }} />);
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

  const cryptoDetails: CryptoDonationDetails = {
    method: "crypto",
    token: { ...initTokenOption, amount: "100", cg_id: "wagmi" },
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
    expect(donationTerm.nextSibling).toHaveTextContent("100.00 ($100.00)");
  });

  const user: Partial<AuthenticatedUser> = {
    token: "123", //determinant if user is logged in
    lastName: "last",
    firstName: "first",
    email: "first@last.mail",
  };

  test("donor information is pre-filled when user is logged in and donor info is not manually set previously", () => {
    mockUseGetter.mockReturnValue(user);
    render(<Summary {...props} />);

    const firstNameInput = screen.getByLabelText(/your name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const emailInput = screen.getByLabelText(/your email/i);

    expect(firstNameInput).toHaveDisplayValue("first");
    expect(lastNameInput).toHaveDisplayValue("last");
    expect(emailInput).toHaveDisplayValue("first@last.mail");

    mockUseGetter.mockClear();
  });

  test("previously set donor information is always used", () => {
    mockUseGetter.mockReturnValue(user);
    render(<Summary {...props} donor={donor} />);

    const firstNameInput = screen.getByLabelText(/your name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const emailInput = screen.getByLabelText(/your email/i);

    expect(firstNameInput).toHaveDisplayValue("John");
    expect(lastNameInput).toHaveDisplayValue("Doe");
    expect(emailInput).toHaveDisplayValue("john@doe.com");

    mockUseGetter.mockClear();
  });
});

import { render, screen } from "@testing-library/react";
import type { UserV2 } from "types/auth";
import { describe, expect, test, vi } from "vitest";
import { stb } from "../__tests__/test-data";
import { initTokenOption } from "../common/constants";
import type {
  CryptoDonationDetails,
  FormDonor,
  StripeDonationDetails,
  SummaryStep,
} from "../types";
import Summary from "./summary";

vi.mock("../context", () => ({
  useDonationState: vi.fn().mockReturnValue({ state: {}, setState: vi.fn() }),
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
  first_name: "John",
  last_name: "Doe",
  title: "Mr",
};

const props: SummaryStep = {
  step: "summary",
  init: {
    source: "bg-marketplace",
    mode: "live",
    recipient: { id: "1", name: "Example Charity", members: [] },
    config: null,
  },
  details: oneTimeStripeDetails,
};

const coverFeeCheckboxLabel =
  /cover payment processing fees for your donation \( example charity receives the full amount \)/i;

describe("summary step", () => {
  test("donation amount text if no tip", async () => {
    const Stub = stb(<Summary {...props} />);
    render(<Stub />);
    const totalRow = await screen.findByRole("term", { name: /amount/i });
    expect(totalRow).toHaveTextContent(/total donation/i);
  });
  test("donation amount text with tip", async () => {
    const Stub = stb(<Summary {...props} tip={{ value: 17, format: "pct" }} />);
    render(<Stub />);
    const totalRow = await screen.findByRole("term", { name: /amount/i });
    expect(totalRow).toHaveTextContent(/donation for example charity/i);
  });
  test("total amount text - one time", async () => {
    const Stub = stb(<Summary {...props} />);
    render(<Stub />);
    const totalRow = await screen.findByRole("term", { name: /total/i });
    expect(totalRow).toHaveTextContent(/total charge/i);
  });

  const subsStripeDetails: StripeDonationDetails = {
    ...oneTimeStripeDetails,
    frequency: "subscription",
  };
  test("total amount text - subscription", async () => {
    // render(<Summary {...props} details={subsStripeDetails} />);
    const Stub = stb(<Summary {...props} details={subsStripeDetails} />);
    render(<Stub />);
    const totalRow = await screen.findByRole("term", { name: /total/i });
    expect(totalRow).toHaveTextContent(/total monthly charge/i);
  });

  test("if fee allowance is previously set, cover fee checkbox must be checked", async () => {
    const Stub = stb(<Summary {...props} feeAllowance={2} />);
    render(<Stub />);

    const coverFeeCheckbox = await screen.findByLabelText(
      coverFeeCheckboxLabel
    );
    expect(coverFeeCheckbox).toBeChecked();

    //processing fee row is not shown in summary step
    expect(screen.queryByRole("term", { name: /fee allowance/i })).toBeNull();
  });
  test("fee allowance not previously set", async () => {
    const Stub = stb(<Summary {...props} />);
    render(<Stub />);

    const coverFeeCheckbox = await screen.findByLabelText(
      coverFeeCheckboxLabel
    );
    expect(coverFeeCheckbox).not.toBeChecked();
  });

  test("only amount row and total row", async () => {
    const Stub = stb(<Summary {...props} />);
    render(<Stub />);
    expect(
      await screen.findByRole("term", { name: /amount/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("term", { name: /sustainability fund/i })
    ).toBeNull();
    expect(screen.queryByRole("term", { name: /direct donation/i })).toBeNull();
    expect(screen.queryByRole("term", { name: /tip/i })).toBeNull();
    expect(screen.getByRole("term", { name: /total/i })).toBeInTheDocument();
  });
  test("with tip row: and effect to total", async () => {
    const Stub = stb(
      <Summary {...props} tip={{ value: 17, format: "amount" }} />
    );
    render(<Stub />);
    expect(
      await screen.findByRole("term", { name: /amount/i })
    ).toBeInTheDocument();
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
    const Stub = stb(<Summary {...props} details={cryptoDetails} />);
    render(<Stub />);

    const donationTerm = await screen.findByRole("term", { name: /amount/i });
    expect(donationTerm).toBeInTheDocument();
    expect(donationTerm.nextSibling).toHaveTextContent("100.00 ($100.00)");
  });

  const user: Partial<UserV2> = {
    lastName: "last",
    firstName: "first",
    email: "first@last.mail",
  };

  test("donor information is pre-filled when user is logged in and donor info is not manually set previously", async () => {
    const Stub = stb(<Summary {...props} />, { root: user });
    render(<Stub />);

    const firstNameInput = await screen.findByLabelText(/your name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const emailInput = screen.getByLabelText(/your email/i);

    expect(firstNameInput).toHaveDisplayValue("first");
    expect(lastNameInput).toHaveDisplayValue("last");
    expect(emailInput).toHaveDisplayValue("first@last.mail");
  });

  test("previously set donor information is always used", async () => {
    const Stub = stb(<Summary {...props} donor={donor} />);
    render(<Stub />);

    const firstNameInput = await screen.findByLabelText(/your name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const emailInput = screen.getByLabelText(/your email/i);

    expect(firstNameInput).toHaveDisplayValue("John");
    expect(lastNameInput).toHaveDisplayValue("Doe");
    expect(emailInput).toHaveDisplayValue("john@doe.com");
  });
});

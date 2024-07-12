import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import type { FormDonor, Honorary } from "../types";
import SummaryForm, { type Props } from "./SummaryForm";

const mockOnSubmit = vi.fn();

const donor: FormDonor = {
  firstName: "",
  lastName: "",
  email: "",
  ukTaxResident: false,
  title: { label: "Select", value: "" },
  zipCode: "",
  streetAddress: "",
};

const honorary: Honorary = {
  withHonorary: false,
  honoraryFullName: "",
  withTributeNotif: false,
  tributeNotif: {
    fromMsg: "",
    toEmail: "",
    toFullName: "",
  },
};

const props: Props = {
  onSubmit: mockOnSubmit,
  donor,
  honorary,
  coverFee: false,
  nonprofitName: "Test Nonprofit",
  mode: "live",
  method: "stripe",
};

const coverFeeCheckboxText = /cover payment processing fees/i;
const ukGiftAidCheckboxLabel =
  /uk taxpayer\? supercharge your donation with gift aid/i;

describe("summary form: fields based on donation method", () => {
  test("stocks: no cover fee option, with gift aid option", () => {
    render(<SummaryForm {...props} method="stocks" />);
    expect(screen.queryByText(coverFeeCheckboxText)).toBeNull();
    expect(screen.getByLabelText(ukGiftAidCheckboxLabel)).toBeInTheDocument();
  });
  test("daf: no cover fee option, with gift aid option", () => {
    render(<SummaryForm {...props} method="daf" />);
    expect(screen.queryByText(coverFeeCheckboxText)).toBeNull();
    expect(screen.getByLabelText(ukGiftAidCheckboxLabel)).toBeInTheDocument();
  });
  test("stripe: with cover fee option, with gift aid option", () => {
    render(<SummaryForm {...props} method="stripe" />);
    expect(screen.getByText(coverFeeCheckboxText)).toBeInTheDocument();
    expect(screen.getByLabelText(ukGiftAidCheckboxLabel)).toBeInTheDocument();
  });
  test("crypto: with cover fee option, without gift aid option", () => {
    render(<SummaryForm {...props} method="crypto" />);
    expect(screen.getByText(coverFeeCheckboxText)).toBeInTheDocument();
    expect(screen.queryByLabelText(ukGiftAidCheckboxLabel)).toBeNull();
  });
});

describe("summary form: expandable fields", async () => {
  test("checking uk gift aid, shows additional fields", async () => {
    render(
      <SummaryForm
        {...props}
        donor={{
          firstName: "first",
          lastName: "last",
          email: "donor@mail.com",
          ukTaxResident: false,
          title: { label: "Select", value: "" },
          zipCode: "",
          streetAddress: "",
        }}
      />
    );
    expect(screen.queryByLabelText(/house number/i)).toBeNull();
    expect(screen.queryByLabelText(/postal code/i)).toBeNull();

    //form is good for submission nonetheless
    const checkoutBtn = screen.getByRole("button", { name: /checkout/i });
    await userEvent.click(checkoutBtn);
    expect(mockOnSubmit).toHaveBeenCalledOnce();
    mockOnSubmit.mockClear();

    //user checks uk gift aid
    const ukGiftAidCheckbox = screen.getByLabelText(ukGiftAidCheckboxLabel);
    await userEvent.click(ukGiftAidCheckbox);

    const houseNumberInput = screen.getByLabelText(/house number/i);
    const postalCodeInput = screen.getByLabelText(/postal code/i);
    expect(houseNumberInput).toBeInTheDocument();
    expect(postalCodeInput).toBeInTheDocument();

    //user needs to populate uk gift aid fields
    await userEvent.click(checkoutBtn);
    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(houseNumberInput).toHaveAccessibleErrorMessage(/required/i);
    expect(postalCodeInput).toHaveAccessibleErrorMessage(/required/i);

    await userEvent.type(houseNumberInput, "221B Baker Street");
    await userEvent.type(postalCodeInput, "2000");
    await userEvent.click(checkoutBtn);
    expect(mockOnSubmit).toHaveBeenCalledOnce();
    mockOnSubmit.mockClear();
  });
});

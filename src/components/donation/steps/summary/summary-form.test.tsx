import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import type { FormDonor, Honorary } from "../types";
import SummaryForm, { type Props } from "./summary-form";

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
  //test("stocks: no cover fee option, with gift aid option", () => {
  //  render(<SummaryForm {...props} method="stocks" />);
  //  expect(screen.queryByText(coverFeeCheckboxText)).toBeNull();
  //  expect(screen.getByLabelText(ukGiftAidCheckboxLabel)).toBeInTheDocument();
  //});
  //test("daf: no cover fee option, with gift aid option", () => {
  //  render(<SummaryForm {...props} method="daf" />);
  //  expect(screen.queryByText(coverFeeCheckboxText)).toBeNull();
  //  expect(screen.getByLabelText(ukGiftAidCheckboxLabel)).toBeInTheDocument();
  //});
  //test("stripe: with cover fee option, with gift aid option", () => {
  //  render(<SummaryForm {...props} method="stripe" />);
  //  expect(screen.getByText(coverFeeCheckboxText)).toBeInTheDocument();
  //  expect(screen.getByLabelText(ukGiftAidCheckboxLabel)).toBeInTheDocument();
  //});
  test("crypto: with cover fee option, without gift aid option", () => {
    render(<SummaryForm {...props} method="crypto" />);
    expect(screen.getByText(coverFeeCheckboxText)).toBeInTheDocument();
    expect(screen.queryByLabelText(ukGiftAidCheckboxLabel)).toBeNull();
  });
});

describe("summary form: expandable fields", async () => {
  test("top fields validation", async () => {
    render(<SummaryForm {...props} />);

    //user submits blank form
    const checkoutBtn = screen.getByRole("button", { name: /checkout/i });
    await userEvent.click(checkoutBtn);
    expect(mockOnSubmit).not.toHaveBeenCalled();

    const firstNameInput = screen.getByLabelText(/your name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const emailInput = screen.getByLabelText(/your email/i);

    expect(firstNameInput).toHaveAccessibleErrorMessage(
      /please enter your first name/i
    );
    expect(firstNameInput).toHaveFocus();
    expect(lastNameInput).toHaveAccessibleErrorMessage(
      /please enter your last name/i
    );
    expect(emailInput).toHaveAccessibleErrorMessage(/please enter your email/i);

    //user inputs required fields
    await userEvent.type(firstNameInput, "first");
    await userEvent.type(lastNameInput, "last");
    await userEvent.type(emailInput, "email");

    //user submits again by email is incorrect
    await userEvent.click(checkoutBtn);
    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(emailInput).toHaveAccessibleErrorMessage(
      /please check your email for correctness/i
    );
    expect(emailInput).toHaveFocus();

    //user correct email input
    await userEvent.clear(emailInput);
    expect(emailInput).toHaveAccessibleErrorMessage(/please enter your email/i);
    await userEvent.type(emailInput, "email@mail.com");
    expect(emailInput).not.toHaveAccessibleErrorMessage();

    //user submits
    await userEvent.click(checkoutBtn);
    expect(mockOnSubmit).toHaveBeenCalledOnce();
    mockOnSubmit.mockClear();

    //user may also select title
    const titlesOpener = screen.getByRole("button", { expanded: false });
    await userEvent.click(titlesOpener);
    const options = screen.getAllByRole("option");
    //select Mr.
    await userEvent.click(options[0]);
    expect(titlesOpener).toHaveTextContent(/mr/i);

    //submit again
    await userEvent.click(checkoutBtn);
    expect(mockOnSubmit).toHaveBeenCalledOnce();
    mockOnSubmit.mockClear();
  });

  //test("checking uk gift aid, shows additional fields", async () => {
  //  render(
  //    <SummaryForm
  //      {...props}
  //      donor={{
  //        ...donor,
  //        firstName: "first",
  //        lastName: "last",
  //        email: "donor@mail.com",
  //      }}
  //    />
  //  );
  //  expect(screen.queryByLabelText(/house number/i)).toBeNull();
  //  expect(screen.queryByLabelText(/postal code/i)).toBeNull();

  //  //form is good for submission nonetheless
  //  const checkoutBtn = screen.getByRole("button", { name: /checkout/i });
  //  await userEvent.click(checkoutBtn);
  //  expect(mockOnSubmit).toHaveBeenCalledOnce();
  //  mockOnSubmit.mockClear();

  //  //user checks uk gift aid
  //  const ukGiftAidCheckbox = screen.getByLabelText(ukGiftAidCheckboxLabel);
  //  await userEvent.click(ukGiftAidCheckbox);

  //  const houseNumberInput = screen.getByLabelText(/house number/i);
  //  const postalCodeInput = screen.getByLabelText(/postal code/i);
  //  expect(houseNumberInput).toBeInTheDocument();
  //  expect(postalCodeInput).toBeInTheDocument();

  //  //user needs to populate uk gift aid fields
  //  await userEvent.click(checkoutBtn);
  //  expect(mockOnSubmit).not.toHaveBeenCalled();
  //  expect(houseNumberInput).toHaveAccessibleErrorMessage(/required/i);
  //  expect(houseNumberInput).toHaveFocus();
  //  expect(postalCodeInput).toHaveAccessibleErrorMessage(/required/i);

  //  await userEvent.type(houseNumberInput, "221B Baker Street");
  //  await userEvent.type(postalCodeInput, "2000");
  //  await userEvent.click(checkoutBtn);
  //  expect(mockOnSubmit).toHaveBeenCalledOnce();
  //  mockOnSubmit.mockClear();
  //});

  test("dedication fields", async () => {
    render(
      <SummaryForm
        {...props}
        donor={{
          ...donor,
          firstName: "first",
          lastName: "last",
          email: "donor@mail.com",
        }}
      />
    );

    //form is good for submission nonetheless
    const checkoutBtn = screen.getByRole("button", { name: /checkout/i });
    await userEvent.click(checkoutBtn);
    expect(mockOnSubmit).toHaveBeenCalledOnce();
    mockOnSubmit.mockClear();

    //user intends to add honorary
    const withHonoraryCheckField =
      screen.getByLabelText(/dedicate my donation/i);
    await userEvent.click(withHonoraryCheckField);
    const honoreeInput = screen.getByLabelText(/honoree's name/i);
    const tributeNotifCheckbox = screen.getByLabelText(
      /notify someone about this tribute/i
    );
    expect(honoreeInput).toBeInTheDocument();
    expect(tributeNotifCheckbox).toBeInTheDocument();

    //user needs to fill out honoree's name
    await userEvent.click(checkoutBtn);
    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(honoreeInput).toHaveAccessibleErrorMessage(/required/i);
    expect(honoreeInput).toHaveFocus();

    //user inputs honoree's name
    await userEvent.type(honoreeInput, "first last");

    //form is good for submission
    await userEvent.click(checkoutBtn);
    expect(mockOnSubmit).toHaveBeenCalledOnce();
    mockOnSubmit.mockClear();

    //user intends to notify someone of the honorary
    await userEvent.click(tributeNotifCheckbox);
    const recipientNameInput = screen.getByLabelText(/recipient name/i);
    const emailAddrInput = screen.getByLabelText(/email address/i);
    const msgInput = screen.getByLabelText(/custom message/i);

    expect(recipientNameInput).toBeInTheDocument();
    expect(emailAddrInput).toBeInTheDocument();
    expect(msgInput).toBeInTheDocument();

    //user needs to fill-out additional information
    await userEvent.click(checkoutBtn);
    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(recipientNameInput).toHaveAccessibleErrorMessage(/required/i);
    expect(recipientNameInput).toHaveFocus();
    expect(emailAddrInput).toHaveAccessibleErrorMessage(/required/i);

    //user populates additional fields
    await userEvent.type(recipientNameInput, "first last");
    expect(recipientNameInput).not.toHaveAccessibleErrorMessage();

    //wrong email
    await userEvent.type(emailAddrInput, "email");
    expect(emailAddrInput).toHaveAccessibleErrorMessage(/invalid email/i);

    //user corrects email
    await userEvent.clear(emailAddrInput);
    await userEvent.type(emailAddrInput, "mail@mail.com");
    expect(emailAddrInput).not.toHaveAccessibleErrorMessage();

    //form is good for submission
    await userEvent.click(checkoutBtn);
    expect(mockOnSubmit).toHaveBeenCalledOnce();
    mockOnSubmit.mockClear();
  });
});

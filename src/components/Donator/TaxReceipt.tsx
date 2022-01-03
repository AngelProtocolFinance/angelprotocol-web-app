import { Field } from "formik";
import React from "react";

function TaxReceipt() {
  return (
    <div className="flex flex-col gap-3 mt-7">
      <p>
        Depending on the country in which you are located, you may required a
        tax receipt for administrative obligations. If you wish to receive a tax
        receipt, please check the chechbox below and fill in the form.
      </p>
      <label className="font-semibold cursor-pointer">
        <Field
          type="checkbox"
          name="receiptRequested"
          className="cursor-pointer mr-2"
        />
        I want a Tax Receipt
      </label>
    </div>
  );
}

export default TaxReceipt;

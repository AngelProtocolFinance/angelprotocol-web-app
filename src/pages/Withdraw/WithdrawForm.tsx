import { Formik, Field, Form, FormikHelpers } from "formik";

interface Values {
  strategy: string;
}

export default function WithdrawForm() {
  return (
    <div className="text-angel-grey">
      <Formik
        initialValues={{ strategy: "" }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setSubmitting(false);
        }}
      >
        <Form>
          <label htmlFor="strategy">Anchor Protocol</label>
          <Field
            className="bg-gray-200"
            id="strategy"
            name="strategy"
            autoComplete="off"
            type="text"
          />
          <div className="flex justify-around mt-6">
            <button
              type="submit"
              className="uppercase hover:bg-blue-accent bg-angel-blue rounded-lg w-28 h-8 text-white-grey text-sm font-bold"
            >
              Withdraw
            </button>
            <button
              type="button"
              className="uppercase hover:bg-angel-orange bg-orange rounded-lg w-28 h-8 text-white-grey text-sm font-bold"
            >
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

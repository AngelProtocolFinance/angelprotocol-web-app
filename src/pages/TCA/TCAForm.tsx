import { ErrorMessage, Field, Form, useFormikContext } from "formik";

export default function TCAForm() {
  const { isSubmitting } = useFormikContext();
  return (
    <Form className="flex flex-col items-center bg-white rounded-xl shadow-lg p-10">
      <label
        htmlFor="amount"
        className="px-1 w-full flex justify-between mb-1 text-angel-grey text-sm"
      >
        <span>Amount</span>
        <span>UST</span>
      </label>
      <Field
        disabled={isSubmitting}
        className="border block w-full bg-white-grey disabled:bg-thin-grey text-lg focus:outline-none  text-angel-grey 
  p-3 rounded-md mb-1"
        id="amount"
        name="amount"
        autoComplete="off"
        type="text"
      />
      <ErrorMessage
        name="amount"
        className="block text-xs text-red-400 pl-2 self-start"
        component="div"
      />

      <button
        disabled={isSubmitting}
        type="submit"
        className="disabled:bg-thin-grey hover:bg-orange bg-angel-orange py-2 px-10 rounded-lg shadow-sm 
  font-bold font-heading text-white text-sm uppercase mt-10"
      >
        Proceed
      </button>
    </Form>
  );
}

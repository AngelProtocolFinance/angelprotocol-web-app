import { ErrorMessage, Field, Form, Formik } from "formik";
import { donatorSchema } from "./donatorSchema";
import useDonate from "./useDonate";

export interface Values {
  amount: string;
}

export enum donateStatus {
  success = "success",
  canceled = "cancelled",
  failed = "failed",
}

export interface ErrorMsg {
  status: donateStatus;
  message: string;
}

export default function Donator() {
  const { handleDonate } = useDonate();
  return (
    <Formik
      initialValues={{ amount: "" }}
      onSubmit={handleDonate}
      validationSchema={donatorSchema}
    >
      {({ isSubmitting, status }) => {
        return (
          <Form className="flex flex-col items-center bg-white rounded-sm shadow-md p-2 h-60">
            <span>{status?.message}</span>
            <p className="text-center my-5">Specify donation amount</p>
            <div className="border mb-1">
              <label
                htmlFor="amount"
                className="bg-blue-400 text-angel-grey text-lg p-2 rounded-sm ml-1"
              >
                UST :
              </label>

              <Field
                className="bg-transparent text-lg focus:outline-none text-angel-grey pl-2 p-2"
                id="amount"
                name="amount"
                autoComplete="off"
                type="text"
              />
            </div>
            <ErrorMessage
              name="amount"
              className="text-xs self-start text-red-400 pl-2"
              component="div"
            />

            <button
              disabled={isSubmitting}
              type="submit"
              className="disabled:bg-angel-grey bg-angel-orange py-1 px-2 rounded-sm shadow-md mt-4"
            >
              Donate
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

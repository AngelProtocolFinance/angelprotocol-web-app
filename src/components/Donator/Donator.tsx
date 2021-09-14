import Announcer from "./Announcer";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { donatorSchema } from "./donatorSchema";
import useDonate from "./useDonate";

export default function Donator() {
  const { result, setResult, handleDonate, UST_balance, network } = useDonate();

  return (
    <Formik
      initialValues={{ amount: "" }}
      onSubmit={handleDonate}
      validationSchema={donatorSchema}
    >
      {({ isSubmitting }) => {
        return (
          <>
            <Announcer resetResult={setResult} result={result} />
            <Form className="flex flex-col items-center bg-white rounded-sm shadow-md pb-5">
              <div className="bg-blue-accent w-full p-4 text-white">
                <h5 className="mb-1">NETWORK - {network.toUpperCase()}</h5>
                <h5 className="mb-1">BALANCE - {UST_balance} UST</h5>
              </div>
              <div className="px-5">
                <p className="text-lg text-center my-5 text-angel-grey">
                  Kindly specify donation amount
                </p>
                <div className="border mb-1">
                  <label
                    htmlFor="amount"
                    className="bg-blue-400 text-angel-grey text-lg p-2 rounded-sm ml-1 font-semibold"
                  >
                    UST :
                  </label>

                  <Field
                    disabled={isSubmitting}
                    className="disabled:bg-thin-grey text-lg focus:outline-none text-angel-grey pl-2 p-2 font-semibold"
                    id="amount"
                    name="amount"
                    autoComplete="off"
                    type="text"
                  />
                </div>
                <ErrorMessage
                  name="amount"
                  className="text-xs self-start text-red-400 pl-2 uppercase"
                  component="div"
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="disabled:bg-thin-grey bg-angel-orange py-1 px-2 rounded-sm shadow-lg mt-10 mb-2 
                font-bold text-angel-grey uppercase"
              >
                Donate
              </button>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

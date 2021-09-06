import LineLoader from "components/Loader/LineLoader";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

interface Values {
  email: string;
}

export default function Subscriber() {
  return (
    <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Field
            type="email"
            name="email"
            className="p-2 rounded-sm w-72 text-blue-accent mb-3 font-semibold 
            focus:outline-none focus:ring-2 focus:ring-white-grey focus:ring-opacity-50"
          />
          <ErrorMessage name="email" />
          <button
            disabled={isSubmitting}
            type="submit"
            className="block bg-angel-orange disabled:bg-angel-grey px-5 py-1 uppercase rounded-sm shadow-md w-36 h-10"
          >
            {isSubmitting ? (
              <LineLoader color="thin-grey" size={"4"} spacing={"2"} />
            ) : (
              "Subscribe"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}

function handleSubmit(values: Values, actions: FormikHelpers<Values>) {
  console.log(values, actions);
}

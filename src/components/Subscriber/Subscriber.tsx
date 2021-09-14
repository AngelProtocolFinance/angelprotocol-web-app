import LineLoader from "components/Loader/LineLoader";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Announcer from "./Announcer";
import handleSubscribe from "./handleSubscribe";
import { subscriberSchema } from "./subscriberSchema";

export enum Status {
  success = "success",
  failed = "failed",
  initial = "initial",
}

export type Handler = () => void;

export interface Values {
  email: string;
}

export default function Subscriber() {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={subscriberSchema}
      onSubmit={handleSubscribe}
    >
      {({ isSubmitting, status, resetForm }) => (
        <>
          <Announcer status={status} resetForm={resetForm} />
          <Form
            autoComplete="off"
            className="flex flex-col items-center lg:items-start"
          >
            <Field
              placeholder="Email"
              disabled={isSubmitting}
              autoComplete="off"
              type="text"
              name="email"
              className="block p-2 rounded-sm w-72 disabled:bg-thin-grey text-blue-accent font-semibold 
            focus:outline-none focus:ring-2 focus:ring-white-grey focus:ring-opacity-50"
            />
            <ErrorMessage
              name="email"
              className="text-sm text-yellow-300 font-semibold mt-1"
              component="div"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="block mt-3 bg-angel-orange disabled:bg-grey-accent px-5 py-1 uppercase rounded-sm shadow-md w-36 h-10"
            >
              {isSubmitting ? (
                <LineLoader color="white" size={"4"} spacing={"2"} />
              ) : (
                "Subscribe"
              )}
            </button>
          </Form>
        </>
      )}
    </Formik>
  );
}

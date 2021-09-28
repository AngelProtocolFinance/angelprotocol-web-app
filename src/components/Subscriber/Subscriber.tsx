import Loader from "components/Loader/Loader";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Announcer from "./Announcer";
import handleSubscribe from "./handleSubscribe";
import { subscriberSchema } from "./subscriberSchema";

export enum Status {
  success = "success",
  failed = "failed",
  initial = "initial",
}

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
      {({ isSubmitting, status }) => (
        <>
          <Announcer status={status} />
          <Form
            autoComplete="off"
            className="relative flex flex-col md:flex-row items-center lg:items-start"
          >
            <Field
              placeholder="Email"
              disabled={isSubmitting}
              autoComplete="off"
              type="text"
              name="email"
              className="block p-2 rounded-md w-72 disabled:bg-thin-grey text-blue-accent font-semibold 
            focus:outline-none focus:ring-2 focus:ring-white-grey focus:ring-opacity-50"
            />
            <ErrorMessage
              name="email"
              className="static mt-2 md:absolute md:left-0 md:-bottom-6 text-sm text-white-grey "
              component="div"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white-grey font-semibold text-sm block ml-2 mt-5 md:mt-0 bg-angel-orange disabled:bg-grey-accent hover:bg-orange px-5 py-1 uppercase rounded-md shadow-md w-36 h-10"
            >
              {isSubmitting ? (
                <Loader
                  bgColorClass="bg-white"
                  widthClass="w-3"
                  gapClass="gap-1"
                />
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

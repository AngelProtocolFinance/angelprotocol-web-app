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
            className="flex flex-col items-center lg:items-start"
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
              className="text-sm text-white-grey mt-1"
              component="div"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange w-48 h-10 rounded-xl uppercase text-base font-bold text-white block mt-3 disabled:bg-grey-accent"
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

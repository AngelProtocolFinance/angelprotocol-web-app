import LineLoader from "components/Loader/LineLoader";
import Modal from "components/Modal/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ErrorPopup from "./ErrorPopup";
import handleSubscribe from "./handleSubscribe";
import SuccessPopup from "./SuccessPopup";
import validator from "./validator";

export type Handler = () => void;

export interface Values {
  email: string;
}

export default function Subscriber() {
  return (
    <Formik
      initialValues={{ email: "" }}
      validate={validator}
      onSubmit={handleSubscribe}
    >
      {({ isSubmitting, status, resetForm }) => (
        <>
          {renderModal(status, resetForm)}
          <Form autoComplete="off">
            <span>{status}</span>
            <Field
              disabled={isSubmitting}
              autoComplete="off"
              type="text"
              name="email"
              className="block p-2 rounded-sm w-72 disabled:bg-thin-grey text-blue-accent font-semibold 
            focus:outline-none focus:ring-2 focus:ring-white-grey focus:ring-opacity-50"
            />
            <ErrorMessage
              name="email"
              className="text-sm text-red-200 mt-1"
              component="div"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="block mt-3 bg-angel-orange disabled:bg-grey-accent px-5 py-1 uppercase rounded-sm shadow-md w-36 h-10"
            >
              {isSubmitting ? (
                <LineLoader color="thin-grey" size={"4"} spacing={"2"} />
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

function renderModal(status: string, resetForm: Handler) {
  switch (status) {
    case "success":
      return (
        <Modal
          render={(closeModal) => (
            <SuccessPopup
              clickHandler={() => {
                resetForm();
                closeModal();
              }}
            />
          )}
        />
      );
    case "failed":
      return (
        <Modal
          render={(closeModal) => (
            <ErrorPopup
              clickHandler={() => {
                resetForm();
                closeModal();
              }}
            />
          )}
        />
      );
    default:
      return null;
  }
}

import { Formik } from "formik";
import Announcer from "./Announcer";
import handleSubscribe from "./handleSubscribe";
import SubscriberForm from "./SubscriberForm";
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
      <>
        <Announcer />
        <SubscriberForm />
      </>
    </Formik>
  );
}

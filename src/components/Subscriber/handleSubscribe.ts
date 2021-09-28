import { FormikHelpers } from "formik";
import { Status, Values } from "./Subscriber";

const portalId = "24900163";
const subscriptionTypeId = "118859752";
const formId = "6593339e-cc5d-4375-bd06-560a8c88879c";
const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

export default async function handleSubscribe(
  values: Values,
  actions: FormikHelpers<Values>
) {
  console.log(values.email);
  const data = {
    fields: [
      {
        name: "email",
        value: values.email,
      },
    ],
    legalConsentOptions: {
      consent: {
        consentToProcess: false,
        text: "Text that gives consent to process",
        communications: [
          {
            value: true,
            subscriptionTypeId: subscriptionTypeId,
            text: "I agree to receive newsletters from Angel Protocol",
          },
        ],
      },
    },
    pageName: "React App API TEST",
  };

  actions.setSubmitting(true);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      actions.setStatus(Status.success);
    } else {
      actions.setStatus(Status.failed);
    }
  } catch (error) {
    console.log(error);
    actions.setStatus(Status.failed);
  }

  actions.setSubmitting(false);
}

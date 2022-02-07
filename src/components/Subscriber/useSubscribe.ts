import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSetModal } from "components/Nodal/Nodal";
import { subscriberSchema } from "./subscriberSchema";
import Popup from "./Popup";

export default function useSubscribe() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<{ email: string }>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(subscriberSchema),
  });

  const { showModal } = useSetModal();

  async function subscribe(values: { email: string }) {
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

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status !== 200) {
        showModal(Popup, {});
      }
      reset();
    } catch (error) {
      console.error(error);
    }
  }
  return { subscribe: handleSubmit(subscribe), register, isSubmitting, errors };
}

const portalId = "24900163";
const subscriptionTypeId = "118859752";
const formId = "6593339e-cc5d-4375-bd06-560a8c88879c";
const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

import { yupResolver } from "@hookform/resolvers/yup";
import Hubspot from "hubspot";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useErrorContext } from "contexts/ErrorContext";
import { logger } from "helpers";

const hubspot = new Hubspot({
  apiKey: process.env.REACT_APP_HUBSPOT_API_KEY || "",
});
const PORTAL_ID = "24900163";
const FORM_ID = "6593339e-cc5d-4375-bd06-560a8c88879c";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email."),
});

const SUCCESS_MESSAGE =
  "The form was sent successfully. By doing so, you have agreed to our privacy policy";

export default function Newsletter() {
  const { handleError } = useErrorContext();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema),
  });

  function submit(data: { email: string }) {
    hubspot.forms
      .submit(PORTAL_ID, FORM_ID, {
        fields: [{ name: "email", value: data.email }],
      })
      .then((res: any) => logger.log(res))
      .catch((err: any) => handleError(err));
  }

  return (
    <div className="flex flex-col items-start gap-2.5 max-w-xs xl:max-w-md">
      <div className="flex flex-col items-start">
        <h6 className="font-header font-bold text-sm uppercase">
          Subscribe to our newsletter
        </h6>
        <p className="font-sans font-normal text-xs">
          By subscribing to this newsletter you confirm that you have read and
          agree with our{" "}
          <a
            href="https://angelprotocol.io/privacy-policy/"
            rel="noreferrer"
            target="_blank"
            className="font-bold cursor-pointer underline"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <form
        className="flex items-start gap-3 xl:gap-6"
        onSubmit={handleSubmit(submit)}
      >
        <input
          className="flex items-center w-44 xl:w-72 py-2 px-3 border border-gray-l2 rounded-lg text-sm"
          placeholder="Enter your email address here"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="btn-primary flex items-center justify-center uppercase py-2 px-3 rounded-lg text-sm font-bold"
          disabled={isSubmitting}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

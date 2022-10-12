import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "pages/Registration/common";
import { useErrorContext } from "contexts/ErrorContext";
import Icon from "components/Icon";
import { FormValues, schema } from "./schema";

const PORTAL_ID = "24900163";
const FORM_ID = "6593339e-cc5d-4375-bd06-560a8c88879c";
const HUBSPOT_API = `https://api.hsforms.com/submissions/v3/integration/secure/submit/${PORTAL_ID}/${FORM_ID}?hapikey=${
  process.env.REACT_APP_HUBSPOT_API_KEY || ""
}`;

export default function Newsletter() {
  const { handleError } = useErrorContext();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    formState: { isSubmitSuccessful, isSubmitting },
  } = methods;

  async function submit(data: FormValues) {
    const response = await fetch(HUBSPOT_API, {
      method: "POST",
      body: JSON.stringify({ fields: [{ name: "email", value: data.email }] }),
    });

    const json = await response.json();
    console.log(json);
    if ("errors" in json) {
      handleError(json.errors);
    }
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

      <FormProvider {...methods}>
        <form
          className="flex items-start gap-3 xl:gap-6"
          onSubmit={handleSubmit(submit)}
        >
          <div>
            <FormInput<FormValues>
              fieldName="email"
              className="flex items-center w-44 xl:w-72 border border-gray-l2 rounded-lg text-sm"
              placeholder="Enter your email address here"
              disabled={isSubmitting}
            />
            {isSubmitSuccessful && (
              <span className="flex gap-1">
                <Icon type="Check" />
                <p>
                  The form was sent successfully. By doing so, you have agreed
                  to our privacy policy
                </p>
              </span>
            )}
          </div>
          <button
            type="submit"
            className="btn-primary flex items-center justify-center uppercase py-2 px-3 rounded-lg text-sm font-bold"
            disabled={isSubmitting}
          >
            Subscribe
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

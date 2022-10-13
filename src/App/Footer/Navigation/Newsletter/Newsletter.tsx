import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useNewsletterSubscribeMutation } from "services/aws/hubspot";
import { useErrorContext } from "contexts/ErrorContext";
import Icon from "components/Icon";
import { FormValues, schema } from "./schema";

export default function Newsletter() {
  const { handleError } = useErrorContext();
  const [subscribe, { isSuccess }] = useNewsletterSubscribeMutation();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors, isValid },
  } = methods;

  async function submit(data: FormValues) {
    try {
      const response = await subscribe(data.email);

      if ("error" in response) {
        throw response.error;
      }
    } catch (error) {
      handleError(error);
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
          <div className="flex flex-col gap-1 w-44 xl:w-72">
            <input
              {...register("email")}
              id="email"
              className="flex items-center border border-gray-l2 rounded-lg text-sm outline-none w-full px-3 py-2 text-black bg-white disabled:bg-gray-100 disabled:text-gray-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              placeholder="Enter your email address here"
              disabled={isSubmitting}
            />
            <ErrorMessage
              errors={errors}
              as="p"
              name="email"
              className="w-full text-xs text-white dark:text-orange-l2 text-center"
            />
            {isSuccess && isValid && (
              <span className="flex gap-1 w-full text-xs">
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

import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNewsletterSubscribeMutation } from "services/aws/hubspot";
import { useErrorContext } from "contexts/ErrorContext";
import Icon from "components/Icon";
import { FormValues, schema } from "./schema";

export default function SubscriptionForm() {
  const { handleError } = useErrorContext();
  const [subscribe, { isSuccess }] = useNewsletterSubscribeMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
  });

  async function submit(data: FormValues) {
    try {
      const response = await subscribe(data.email);

      if ("error" in response) {
        throw response.error;
      }

      reset();
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <form
      className="flex flex-col items-center gap-3 lg:flex-row lg:items-start xl:gap-6 w-4/5"
      onSubmit={handleSubmit(submit)}
    >
      <div className="flex flex-col gap-1 w-full lg:w-44 xl:w-72">
        <input
          {...register("email")}
          id="email"
          className="flex items-center border border-gray-l2 rounded-lg text-xs text-black outline-none w-full px-3 py-2 bg-white disabled:bg-gray-100 disabled:text-gray-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 lg:text-sm"
          placeholder="Enter your email address here"
          disabled={isSubmitting}
        />
        <ErrorMessage
          errors={errors}
          as="p"
          name="email"
          className="w-full text-xs text-red-l4 dark:text-red-l2 text-center"
        />
        {isSuccess && !errors.email && <SuccessMessage />}
      </div>
      <button
        type="submit"
        className="btn-orange flex items-center justify-center py-2 px-3 rounded-lg text-xs w-full lg:w-min lg:text-sm"
        disabled={isSubmitting}
      >
        Subscribe
      </button>
    </form>
  );
}

function SuccessMessage() {
  return (
    <span className="flex gap-1 w-full text-xs">
      <Icon type="Check" />
      <p>
        The form was sent successfully. By doing so, you have agreed to our
        privacy policy
      </p>
    </span>
  );
}

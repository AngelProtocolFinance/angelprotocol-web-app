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
      className="flex flex-col items-center gap-4 w-full md:w-4/5 lg:w-full xl:flex-row xl:items-start xl:gap-6"
      onSubmit={handleSubmit(submit)}
    >
      <div className="flex flex-col gap-1 w-full">
        <input
          {...register("email")}
          id="email"
          className="flex items-center border border-gray-l2 rounded-lg text-sm font-body text-black outline-none w-full h-10 px-3 bg-white disabled:bg-gray-100 disabled:text-gray-800 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 xl:text-sm"
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
        className="btn btn-orange px-3 rounded-lg text-sm h-10 w-full xl:w-min"
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

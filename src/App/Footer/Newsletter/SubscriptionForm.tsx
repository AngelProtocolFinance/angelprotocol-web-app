import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "components/Icon";
import { useErrorContext } from "contexts/ErrorContext";
import { useForm } from "react-hook-form";
import { useNewsletterSubscribeMutation } from "services/aws/hubspot";
import { object, string } from "yup";

type FV = { email: string };

export default function SubscriptionForm() {
  const { handleError } = useErrorContext();
  const [subscribe, { isSuccess }] = useNewsletterSubscribeMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FV>({
    resolver: yupResolver(
      object({
        email: string()
          .trim()
          .email("Invalid email format")
          .required("Please enter your email."),
      })
    ),
    reValidateMode: "onSubmit",
  });

  async function submit(data: FV) {
    try {
      await subscribe(data.email).unwrap();
      reset();
    } catch (error) {
      //user might already be subscribed and server returns a helpful message
      handleError(error, "parsed");
    }
  }

  return (
    <form
      className="flex flex-col items-center gap-4 w-full md:w-4/5 lg:w-full xl:flex-row xl:items-start xl:gap-6"
      onSubmit={handleSubmit(submit)}
    >
      <div className="flex flex-col gap-1 w-[80vw] lg:w-full">
        <input
          {...register("email")}
          id="email"
          className="cursor-default text-[#000000] opacity-[.9] p-3 rounded-md font-normal border text-[15px] md:text-[13px] border-solid  border-[#0000001a] w-full"
          placeholder="Enter your email"
          disabled={isSubmitting}
        />
        <ErrorMessage
          errors={errors}
          as="p"
          name="email"
          className="w-full text-xs text-white text-center"
        />
        {isSuccess && !errors.email && <SuccessMessage />}
      </div>
      <button
        type="submit"
        className="bg-blue-d1 rounded-[40px] px-7 py-[11px] text-white text-xs font-medium"
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

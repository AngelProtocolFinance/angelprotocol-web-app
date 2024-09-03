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
    <form className="grid content-start" onSubmit={handleSubmit(submit)}>
      <div className="grid mb-3">
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
          className="w-full text-xs text-red-d2 text-left mt-0.5"
        />
        {isSuccess && !errors.email && <SuccessMessage />}
      </div>
      <button
        type="submit"
        className="sm:justify-self-start bg-blue-d1 rounded-full px-5 py-2 text-white text-sm font-medium"
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
      <Icon type="Check" size={14} />
      <p>
        The form was sent successfully. By doing so, you have agreed to our
        privacy policy
      </p>
    </span>
  );
}

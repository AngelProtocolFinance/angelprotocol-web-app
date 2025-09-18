import { valibotResolver } from "@hookform/resolvers/valibot";
import { Input, PasswordInput } from "components/form";
import { use_action_result } from "hooks/use-action-result";
import { use_counter } from "hooks/use-counter";
import { useFetcher } from "react-router";
import { useRemixForm } from "remix-hook-form";
import { type IPasswordSchema, password_schema } from "./schema";
import type { CodeRecipient } from "./types";

const MAX_TIME = 30;

type Props = {
  recipient: CodeRecipient;
};

export default function SetPasswordForm(props: Props) {
  const fetcher = useFetcher();
  const { counter, reset_counter } = use_counter(MAX_TIME);
  use_action_result(fetcher.data, {
    on_data: () => reset_counter(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useRemixForm<IPasswordSchema>({
    resolver: valibotResolver(password_schema),
  });

  return (
    <fetcher.Form
      method="POST"
      onSubmit={handleSubmit}
      className="grid w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l3 rounded-2xl"
    >
      <input type="hidden" name="email" value={props.recipient.recipient_raw} />
      <h3 className="text-center text-xl sm:text-2xl font-bold text-gray-d4">
        Set new password
      </h3>
      <section className="text-center font-normal max-sm:text-sm mt-2">
        <span>6-digit security code has been sent to</span>{" "}
        <span className="font-medium">
          {props.recipient.recipient_obscured}
        </span>{" "}
        <span>- it will take few minutes to arrive</span>
        <div className="text-center">
          <button
            name="intent"
            value="edit-email"
            type="submit"
            className="text-center text-blue-d1 hover:text-blue active:text-blue-d2 disabled:text-gray-l2 font-bold underline hover:cursor-pointer"
          >
            Edit email
          </button>
        </div>
      </section>

      <div className="mt-6 grid gap-3">
        <Input
          {...register("otp")}
          placeholder="Enter 6-digit code"
          autoComplete="one-time-code"
          error={errors.otp?.message}
        />

        <span className="mb-3 flex items-center justify-between text-xs sm:text-sm font-medium">
          <span>
            Trouble getting your code? Request a new one in 00:
            {String(counter).padStart(2, "0")}
          </span>
          <button
            name="intent"
            value="resend-otp"
            type="submit"
            className="text-blue-d1 hover:text-blue active:text-blue-d2 disabled:text-gray-l2 font-bold underline"
            disabled={counter > 0}
          >
            Resend code
          </button>
        </span>

        <PasswordInput
          {...register("password")}
          error={errors.password?.message}
          placeholder="New Password"
        />
        <PasswordInput
          {...register("password_confirmation")}
          error={errors.password_confirmation?.message}
          placeholder="Confirm New Password"
        />
      </div>

      <div className="mt-6 font-normal text-xs sm:text-[13px] leading-5">
        In order to protect your account, make sure your password:
        <ul className="list-disc list-inside">
          <li className="ml-2">Has at least 8 characters</li>
          <li className="ml-2">Contains at least 1 number</li>
          <li className="ml-2">Contains at least 1 special character</li>
          <li className="ml-2">Contains at least 1 uppercase letter</li>
          <li className="ml-2">Contains at least 1 lowercase letter</li>
        </ul>
      </div>

      <button
        name="intent"
        value="confirm"
        disabled={fetcher.state !== "idle"}
        type="submit"
        className="mt-6 w-full h-12 sm:h-[52px] flex-center btn-blue rounded-full normal-case sm:text-lg font-bold"
      >
        Confirm
      </button>
    </fetcher.Form>
  );
}

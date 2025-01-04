import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { useFetcher } from "@remix-run/react";
import { Input, PasswordInput } from "components/form";
import useCounter from "hooks/useCounter";
import { useEffect } from "react";
import { toast } from "sonner";
import { type ActionData, isData, isFormErr } from "types/action";
import type { CodeRecipient } from "./types";

const MAX_TIME = 30;

type Props = {
  recipient: CodeRecipient;
};

export default function SetPasswordForm(props: Props) {
  const fetcher = useFetcher<ActionData>();
  const [form, fields] = useForm({
    shouldRevalidate: "onSubmit",
    lastResult: isFormErr(fetcher.data) ? fetcher.data : undefined,
  });

  const { counter, resetCounter } = useCounter(MAX_TIME);

  //biome-ignore lint:
  useEffect(() => {
    if (!fetcher.data) return;
    if (isData(fetcher.data)) {
      toast.success(fetcher.data.__ok);
      resetCounter();
      return;
    }
  }, [fetcher.data]);

  return (
    <fetcher.Form
      method="POST"
      action="."
      {...getFormProps(form)}
      className="grid w-full max-w-md px-6 sm:px-7 py-7 sm:py-8 bg-white border border-gray-l4 rounded-2xl"
    >
      <input type="hidden" name="email" value={props.recipient.recipient_raw} />
      <h3 className="text-center text-xl sm:text-2xl font-bold text-navy-d4">
        Set new password
      </h3>
      <p className="text-center font-normal max-sm:text-sm mt-2">
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
      </p>

      <div className="mt-6 grid gap-3">
        <Input
          {...getInputProps(fields.otp, { type: "text" })}
          placeholder="Enter 6-digit code"
          autoComplete="one-time-code"
          error={fields.otp.errors?.at(0)}
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
          {...getInputProps(fields.password, { type: "password" })}
          error={fields.password.errors?.at(0)}
          placeholder="New Password"
        />
        <PasswordInput
          {...getInputProps(fields.passwordConfirmation, { type: "password" })}
          error={fields.passwordConfirmation.errors?.at(0)}
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
        className="mt-6 w-full h-12 sm:h-[52px] flex-center bg-blue-d1 disabled:bg-gray text-white enabled:hover:bg-blue enabled:active:bg-blue-d2 rounded-full normal-case sm:text-lg font-bold"
      >
        Confirm
      </button>
    </fetcher.Form>
  );
}

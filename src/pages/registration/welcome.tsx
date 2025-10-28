import { LoadText } from "components/load-text";
import { APP_NAME } from "constants/env";
import { CircleCheck } from "lucide-react";
import { Form, useNavigation } from "react-router";
export { new_application as action } from "./api";
export { ErrorBoundary } from "components/error";
export default function Welcome() {
  const nav = useNavigation();
  return (
    <Form method="POST" className="grid justify-items-center mx-6">
      <CircleCheck className="text-green" size={80} />
      <h1 className="text-[2rem] mt-10 text-center text-balance">
        Thank you for joining {APP_NAME}!
      </h1>
      <p className="text-center text-pretty text-gray dark:text-white/75 w-full text-lg max-w-lg mt-4 mb-8">
        Your account is ready - next, register your nonprofit to become a
        member.
      </p>

      <button
        disabled={nav.state === "submitting"}
        className="w-full max-w-[26.25rem] btn btn-blue text-sm"
      >
        <LoadText text="Continue registration">Continue registration</LoadText>
      </button>

      <p className="text-sm italic text-gray dark:text-gray mt-8 text-center">
        Note: You can finish later. We've emailed you a link to pick up where
        you left off.
      </p>
    </Form>
  );
}

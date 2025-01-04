import { useFetcher } from "@remix-run/react";
import LoadText from "components/LoadText";
import { APP_NAME } from "constants/env";
import { CircleCheck } from "lucide-react";

export { newApplicationAction as clientAction } from "./api";
export default function Welcome() {
  const fetcher = useFetcher();

  return (
    <div className="grid justify-items-center mx-6">
      <CircleCheck className="text-green" size={80} />
      <h1 className="text-[2rem] mt-10 text-center">
        Thank you for joining {APP_NAME}!
      </h1>
      <p className="text-center text-navy-l1 dark:text-white/75 w-full text-lg max-w-lg mt-4 mb-8">
        Your fundraising profile & account are just few steps away 😇
      </p>

      <fetcher.Form className="contents" action="." method="POST">
        <button
          disabled={fetcher.state !== "idle"}
          className="w-full max-w-[26.25rem] btn-blue btn-reg"
        >
          <LoadText text="Continue registration">
            Continue registration
          </LoadText>
        </button>
      </fetcher.Form>

      <p className="text-sm italic text-navy-l1 dark:text-navy-l2 mt-8 text-center">
        Note: Registration is quick, but we've sent an email link if you need to
        pause and resume at any point.
      </p>
    </div>
  );
}

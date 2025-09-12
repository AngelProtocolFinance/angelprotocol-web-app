import { APP_NAME } from "constants/env";
import { metas } from "helpers/seo";
import type { Route } from "./+types";
import InitForm from "./init-form";
import SetPasswordForm from "./set-password-form";
import Success from "./success";

export { loader, action } from "./api";
export { ErrorBoundary } from "components/error";

export const meta: Route.MetaFunction = () =>
  metas({ title: `Reset Password - ${APP_NAME}` });

export default function Page({ loaderData }: Route.ComponentProps) {
  const { redirect, step } = loaderData;

  const content = (() => {
    if (step.type === "init") {
      return <InitForm to={redirect} />;
    }

    if (step.type === "set-password") {
      const { type, ...recipient } = step;
      return <SetPasswordForm recipient={recipient} />;
    }

    return <Success to={redirect} />;
  })();

  return (
    <div className="grid place-items-center px-4 py-14 text-gray">
      {content}
    </div>
  );
}

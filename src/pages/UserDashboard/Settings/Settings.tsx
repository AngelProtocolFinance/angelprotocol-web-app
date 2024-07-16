import type { AuthenticatedUser } from "types/auth";
import EndowAlertForm from "./EndowAlertForm";

interface Props {
  user: AuthenticatedUser;
}

export default function Settings(props: Props) {
  return (
    <div>
      <h2 className="text-3xl">Settings</h2>
      <p className="mt-4">
        Here you can update the various settings that relate to the nonprofit(s)
        you are member of.
      </p>
      <EndowAlertForm user={props.user} classes="mt-8" />
    </div>
  );
}
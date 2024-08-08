import { useAuthenticatedUser } from "contexts/Auth";
import EndowAlertForm from "./EndowAlertForm";

export default function Settings() {
  const user = useAuthenticatedUser();
  return (
    <div className="grid">
      <h2 className="text-3xl">Settings</h2>
      <p className="mt-4">
        Here, you can update various settings relating to any nonprofit that you
        are a member of.
      </p>
      <EndowAlertForm user={user} classes="mt-4 justify-self-start" />
    </div>
  );
}

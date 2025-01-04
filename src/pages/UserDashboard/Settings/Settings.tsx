import { useLoaderData } from "@remix-run/react";
import EndowAlertForm from "./EndowAlertForm";
import type { SettingsData } from "./index";

export default function Settings() {
  const { user, userEndows } = useLoaderData() as SettingsData;
  return (
    <div className="grid">
      <h2 className="text-3xl">Settings</h2>
      <p className="mt-4">
        Here, you can update various settings relating to any nonprofit that you
        are a member of.
      </p>
      <EndowAlertForm
        user={user}
        userEndows={userEndows}
        classes="mt-4 justify-self-start"
      />
    </div>
  );
}

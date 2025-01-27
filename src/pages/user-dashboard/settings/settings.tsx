import { useCachedLoaderData } from "api/cache";
import type { SettingsData } from "./api";
import EndowAlertForm from "./endow-alert-form";
export { loader, action } from "./api";
export { clientLoader } from "api/cache";
export { ErrorBoundary } from "components/error";
export default function Settings() {
  const { user, userEndows } = useCachedLoaderData<SettingsData>();
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

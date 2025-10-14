import type { Route } from "./+types";
import { Display } from "./display";
import { Form } from "./form";

export { loader, action } from "./api";

export default function Page({ loaderData: { apiKey } }: Route.ComponentProps) {
  return (
    <div className="grid content-start @container">
      <h3 className="text-[2rem] mb-2">Integrations</h3>
      <div className="mb-4 border border-gray-l3 rounded p-4">
        <h4 className="text-xl  font-medium mb-2 text-[#FF4F00]">Zapier</h4>
        <p className="text-sm text-gray-d1 mb-4">
          Generate an API key to use with Better Giving Zapier Integration
        </p>
        {apiKey ? <Display apiKey={apiKey} /> : <Form />}
      </div>
    </div>
  );
}

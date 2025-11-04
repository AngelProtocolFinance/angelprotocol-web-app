import type { Route } from "./+types";
import { FormsList } from "./forms-list";
export { loader } from "./api";
export default function Page({ loaderData: d }: Route.ComponentProps) {
  return (
    <div className="px-6 py-4 md:px-10 md:py-8">
      <h2 className="text-2xl mb-6">Donation Forms</h2>
      <FormsList {...d} />
    </div>
  );
}

import type { Route } from "./+types";

export { loader } from "./api";
export default function Page({ loaderData: d }: Route.ComponentProps) {
  return (
    <div className="px-6 py-4 md:px-10 md:py-8">
      <h3 className="text-2xl">Donation forms</h3>
    </div>
  );
}

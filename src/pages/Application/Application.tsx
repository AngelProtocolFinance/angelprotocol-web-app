import { useLoaderData } from "@remix-run/react";
import { CircleAlert } from "lucide-react";
import Loaded from "./Loaded";
import type { LoaderData } from "./api";

export { meta, loader } from "./api";
export { ErrorBoundary } from "components/error";
export default function Application() {
  const { application, user } = useLoaderData() as LoaderData;

  if (!user.groups.includes("ap-admin")) {
    return (
      <div className="grid content-start place-items-center py-20">
        <CircleAlert size={80} className="text-red" />
        <p className="text-xl mt-8">Unauthorized</p>
      </div>
    );
  }

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container py-20">
      <h1 className="text-center text-3xl col-span-full max-lg:mb-4">
        Applications Review - Details
      </h1>
      <Loaded {...application} />
    </div>
  );
}

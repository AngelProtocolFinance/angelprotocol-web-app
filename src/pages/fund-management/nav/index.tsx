import { useCachedLoaderData } from "remix-client-cache";
import type { LoaderData } from "./api";

export { loader } from "./api";
export { clientLoader } from "api/cache";

export default function Page() {
  const data = useCachedLoaderData() as LoaderData;
  console.log(data);
  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <h3 className="font-bold text-2xl mb-4">Nav</h3>
    </div>
  );
}

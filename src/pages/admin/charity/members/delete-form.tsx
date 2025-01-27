import { useFetcher } from "@remix-run/react";
import { LoaderCircle, Minus } from "lucide-react";
import { toast } from "sonner";

export function DeleteForm({ email }: { email: string }) {
  async function handleRemove(toRemove: string) {
    if (toRemove === email) {
      return toast.error("Can't delete self");
    }
    if (!window.confirm(`Are you sure you want to remove ${toRemove}?`)) return;
    fetcher.submit(
      { toRemove },
      { action: ".", method: "POST", encType: "application/json" }
    );
  }

  const fetcher = useFetcher({ key: `admin-${email}` });

  return (
    <fetcher.Form method="POST" className="relative">
      <button
        disabled={fetcher.state !== "idle"}
        onClick={() => handleRemove(email)}
        type="button"
        className=" disabled:text-navy-l2 hover:text-red active:text-red absolute-center"
      >
        {fetcher.state !== "idle" ? (
          <LoaderCircle size={16} className="animate-spin" />
        ) : (
          <Minus size={16} />
        )}
      </button>
    </fetcher.Form>
  );
}

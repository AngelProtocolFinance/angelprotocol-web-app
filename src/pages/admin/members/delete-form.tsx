import { LoaderCircle, Minus } from "lucide-react";
import { useFetcher } from "react-router";
import { toast } from "sonner";

interface Props {
  user: string;
  to_remove: string;
}

export function DeleteForm({ user, to_remove }: Props) {
  const fetcher = useFetcher({ key: `admin-${to_remove}` });

  return (
    <fetcher.Form method="POST" className="relative">
      <button
        disabled={fetcher.state !== "idle"}
        onClick={() => {
          if (to_remove === user) {
            return toast.error("Can't delete self");
          }
          if (!window.confirm(`Are you sure you want to remove ${to_remove}?`))
            return;
          fetcher.submit(
            { to_remove },
            { action: ".", method: "POST", encType: "application/json" }
          );
        }}
        type="button"
        className=" disabled:text-gray hover:text-red active:text-red absolute-center"
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

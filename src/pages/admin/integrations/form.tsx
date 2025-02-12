import { useFetcher } from "@remix-run/react";

export function Form() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form className="contents" method="POST">
      <button
        type="submit"
        disabled={fetcher.state === "submitting"}
        className="btn btn-blue rounded-full px-6 py-2 text-sm normal-case"
      >
        {fetcher.state === "submitting" ? "Generating..." : "Generate"}
      </button>
    </fetcher.Form>
  );
}

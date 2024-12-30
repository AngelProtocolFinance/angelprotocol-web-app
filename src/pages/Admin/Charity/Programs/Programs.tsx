import type { NewProgram } from "@better-giving/endowment";
import { useFetcher } from "react-router";
import List from "./List";

export default function Programs() {
  const fetcher = useFetcher();
  async function handleCreateProgram() {
    const program: NewProgram = {
      title: "New program",
      description: "program description",
      milestones: [],
    };
    fetcher.submit(program, {
      action: ".",
      method: "POST",
      encType: "application/json",
    });
  }

  const isLoading = fetcher.state !== "idle";

  return (
    <div className="grid content-start gap-y-6 @lg:gap-y-8 @container">
      <div className="flex items-center justify-between">
        <h2 className="text-[2rem] font-bold">Programs</h2>
        <button
          disabled={isLoading}
          type="button"
          onClick={handleCreateProgram}
          className="btn-blue px-8 py-2"
        >
          {isLoading ? "Creating..." : "Create Program"}
        </button>
      </div>
      <List />
    </div>
  );
}

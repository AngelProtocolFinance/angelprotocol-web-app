import { Requests } from "./table";

export default function Page() {
  return (
    <div className="@container w-full max-w-4xl grid content-start gap-8">
      <h3 className="font-bold text-2xl mb-4">Tx Requests</h3>

      <Requests />
    </div>
  );
}

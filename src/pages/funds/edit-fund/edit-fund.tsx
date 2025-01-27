import { useLoaderData } from "@remix-run/react";
import { CircleAlert } from "lucide-react";
import type { LoaderData } from "./api";
import { Form } from "./form";

const containerClass = "padded-container mt-8 grid content-start";
export default function EditFund() {
  const { fund, user } = useLoaderData() as LoaderData;

  if (
    !user.funds.includes(fund.id) &&
    !user.endowments.map((n) => n.toString()).includes(fund.creator_id)
  ) {
    return (
      <div className="grid content-start place-items-center pt-40 pb-20">
        <CircleAlert size={80} className="text-red" />
        <p className="text-xl mt-8">Unauthorized</p>
      </div>
    );
  }

  if (!fund.active) {
    return (
      <div className="grid content-start place-items-center pt-40 pb-20">
        <CircleAlert size={80} className="text-red" />
        <p className="text-xl mt-8">This fund is already closed</p>
      </div>
    );
  }

  return <Form {...fund} classes={containerClass} />;
}

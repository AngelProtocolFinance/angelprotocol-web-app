import { skipToken } from "@reduxjs/toolkit/query";
import { ErrorStatus, LoadingStatus } from "components/Status";
import withAuth from "contexts/Auth";
import { CircleAlert } from "lucide-react";
import { useParams } from "react-router-dom";
import { useFundQuery } from "services/aws/funds";
import { Form } from "./Form";

const containerClass = "padded-container mt-8 grid content-start";
export default withAuth(function EditFund({ user }) {
  const { fundId = "" } = useParams();

  const { data, isLoading, isError } = useFundQuery(fundId || skipToken);

  if (isLoading) {
    return (
      <div className={containerClass}>
        <LoadingStatus>Getting fund... </LoadingStatus>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={containerClass}>
        <ErrorStatus>Failed to get fund</ErrorStatus>
      </div>
    );
  }

  if (
    !user.funds.includes(fundId) &&
    !user.endowments.map((n) => n.toString()).includes(data.creator_id)
  ) {
    return (
      <div className="grid content-start place-items-center pt-40 pb-20">
        <CircleAlert size={80} className="text-red" />
        <p className="text-xl mt-8">Unauthorized</p>
      </div>
    );
  }

  if (!data.active) {
    return (
      <div className="grid content-start place-items-center pt-40 pb-20">
        <CircleAlert size={80} className="text-red" />
        <p className="text-xl mt-8">This fund is already closed</p>
      </div>
    );
  }

  return <Form {...data} classes={containerClass} />;
});

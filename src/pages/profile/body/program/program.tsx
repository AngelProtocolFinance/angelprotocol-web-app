import type { Program as IProgram } from "@better-giving/endowment";
import { useLoaderData } from "@remix-run/react";
import { RichText } from "components/rich-text";
import { toUsd } from "helpers/to-usd";
import Container from "../common/container";
import Milestones from "./milestones";

export default function Program() {
  const prog = useLoaderData() as IProgram;

  return (
    <div className="order-4 lg:col-span-2 w-full h-full grid items-start grid-rows-[auto_auto] gap-8 lg:grid-rows-1 lg:grid-cols-[1fr_auto]">
      <Container title={prog.title} expanded>
        <RichText
          content={{ value: prog.description }}
          readOnly
          classes={{ container: "m-6" }}
        />
        {prog.targetRaise ? (
          <TargetProgress
            target={prog.targetRaise}
            total={prog.totalDonations ?? 0}
          />
        ) : null}
      </Container>
      <Milestones
        classes="self-start lg:sticky lg:top-28"
        milestones={prog.milestones}
      />
    </div>
  );
}

type ProgressProps = {
  target: number;
  total: number;
};
function TargetProgress({ target, total }: ProgressProps) {
  const progressPct = Math.min(1, total / target) * 100;
  return (
    <div className="m-6 border-t border-gray-l3 pt-2 font-heading">
      <div className="mb-2 flex items-center gap-2">
        <p className="font-medium">Target raise:</p>
        <p className="font-bold text-gray">{toUsd(target)}</p>
      </div>
      <div className="h-4 rounded-full bg-gray-l4 relative overflow-clip">
        <div className="h-full bg-green" style={{ width: `${progressPct}%` }} />
      </div>
      {total ? (
        <div className="mt-1 flex items-center gap-2 text-sm text-gray">
          <p>Donations received</p>
          <p>{toUsd(total)}</p>
        </div>
      ) : null}
    </div>
  );
}

import { PropsWithChildren } from "react";
import { toHours } from "helpers/admin";
import { useAdminContext } from "../../Context";

export default function Settings() {
  const { members, config } = useAdminContext();

  const hours = +toHours(config.duration);

  return (
    <div className="grid content-start border border-gray-l3 dark:border-bluegray p-4 @lg:p-8 rounded">
      <h2 className="font-bold text-2xl mb-8">Settings</h2>
      <div className="@container border border-gray-l3 dark:border-bluegray rounded divide-y divide-prim">
        <Container>
          <p>
            Proposals can be executed when <Bold>{config.threshold}</Bold> out{" "}
            <Bold>{members.length || 1}</Bold> members cast their vote.
          </p>
        </Container>
        <Container>
          <p>
            Proposals duration is <Bold>{hours}</Bold> hour
            {hours > 1 ? "s" : ""}.
          </p>
        </Container>
        <Container>
          <p>
            Proposals auto-execution is turned{" "}
            <Bold>{config.requireExecution ? "OFF" : "ON"}</Bold>.
          </p>
        </Container>
      </div>
    </div>
  );
}

const Container = ({ children }: PropsWithChildren) => (
  <div className="grid @lg:flex @lg:items-center py-3 px-4 @lg:justify-between">
    {children}
  </div>
);

const Bold = ({ children }: PropsWithChildren) => (
  <span className="font-bold">{children}</span>
);

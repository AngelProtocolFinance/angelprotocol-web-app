import { PropsWithChildren } from "react";
import { useAdminResources } from "pages/Admin/Guard";
import { useModalContext } from "contexts/ModalContext";
import ThresholdForm from "./ThresholdForm";

export default function Settings() {
  const { members, config } = useAdminResources();
  const { showModal } = useModalContext();
  return (
    <div className="content-start border border-prim p-4 md:p-8 rounded">
      <h2 className="font-bold text-center sm:text-left text-xl mb-8">
        Settings
      </h2>
      <div className="@container border border-prim rounded divide-y divide-prim">
        <Container
          onBtnClick={() =>
            showModal(ThresholdForm, {
              added: members,
              initial: config.threshold,
            })
          }
        >
          <p>
            Proposals can be executed when <Bold>{config.threshold}</Bold> out{" "}
            <Bold>{members.length || 1}</Bold> members cast their vote.
          </p>
        </Container>
        <Container>
          <p>
            Proposals duration is <Bold>not set</Bold>
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

const Container = ({
  children,
  onBtnClick,
}: PropsWithChildren<{ onBtnClick?(): void }>) => (
  <div className="grid @lg:flex @lg:items-center py-3 px-4 @lg:justify-between">
    {children}
    <button
      disabled={!onBtnClick}
      type="button"
      className="btn-outline-filled px-8 py-2 text-sm mt-4 @lg:mt-0"
      onClick={onBtnClick}
    >
      change
    </button>
  </div>
);

const Bold = ({ children }: PropsWithChildren) => (
  <span className="font-bold">{children}</span>
);

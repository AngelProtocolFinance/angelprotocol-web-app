import { PropsWithChildren, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FV } from "./types";
import { useModalContext } from "contexts/ModalContext";
import Form, { Desc, FormProps, Title } from "../common/Form";
import NavButtons from "../common/NavButtons";
import DurationForm from "./DurationForm";
import Members from "./Members";
import ThresholdForm from "./ThresholdForm";

export default function ManageForm(props: FormProps) {
  const { setValue, getValues, watch } = useFormContext<FV>();
  const { showModal } = useModalContext();

  const members = watch("members");
  const { threshold, isAutoExecute, duration } = watch("proposal");

  /** watch for members and adjust threshold accordingly */
  useEffect(() => {
    const n = members.length || 1;
    const threshold = getValues("proposal.threshold");
    if (n < +threshold) setValue("proposal.threshold", n);
  }, [members, getValues, setValue]);

  return (
    <Form {...props}>
      <Title className="mb-2">AST Management</Title>
      <Desc className="mb-8">
        The Management of your AST comprises one or more members that will be in
        charge of taking key decisions for your AST. Here, you can add members,
        decide how many signatories are necessary to execute decisions and how
        long decision requests are open for.
      </Desc>

      <Members classes="mb-8" />

      <div className="content-start border border-gray-l3 dark:border-bluegray p-4 md:p-8 rounded">
        <h2 className="font-bold text-center sm:text-left text-xl mb-8">
          Settings
        </h2>
        <div className="@container border border-gray-l3 dark:border-bluegray rounded divide-y divide-prim">
          <Container
            onBtnClick={() =>
              showModal(ThresholdForm, {
                added: getValues("members").map((m) => m),
                initial: threshold,
                onChange: (v) => setValue("proposal.threshold", v),
              })
            }
          >
            <p>
              Proposals can be executed when <Bold>{threshold}</Bold> out{" "}
              <Bold>{members.length || 1}</Bold> members cast their vote.
            </p>
          </Container>
          <Container
            onBtnClick={() =>
              showModal(DurationForm, {
                initial: duration,
                onChange: (v) => setValue("proposal.duration", v),
              })
            }
          >
            <p>
              Proposals duration is <Bold>{duration}</Bold> hour
              {+duration > 1 ? "s" : ""}.
            </p>
          </Container>
          <Container
            onBtnClick={() => {
              const prev = getValues("proposal.isAutoExecute");
              setValue("proposal.isAutoExecute", !prev);
            }}
          >
            <p>
              Proposals auto-execution is turned{" "}
              <Bold>{isAutoExecute ? "ON" : "OFF"}</Bold>.
            </p>
          </Container>
        </div>
      </div>

      <NavButtons classes="mt-8" curr={2} />
    </Form>
  );
}

const Container = ({
  children,
  onBtnClick,
}: PropsWithChildren<{ onBtnClick(): void }>) => (
  <div className="grid @lg:flex @lg:items-center py-3 px-4 @lg:justify-between">
    {children}
    <button
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

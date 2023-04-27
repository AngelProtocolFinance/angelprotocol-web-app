import { PropsWithChildren, ReactNode, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FV } from "./types";
import { useModalContext } from "contexts/ModalContext";
import { Field } from "components/form";
import Form, { Desc, FormProps, Title } from "../common/Form";
import NavButtons from "../common/NavButtons";
import Toggle from "../common/Toggle";
import Members from "./Members";
import ThresholdForm from "./ThresholdForm";

export default function ManageForm(props: FormProps) {
  const { setValue, getValues, watch } = useFormContext<FV>();
  const { showModal } = useModalContext();

  const members = watch("members");
  const threshold = watch("proposal.threshold");

  /** watch for members and adjust threshold accordingly */
  useEffect(() => {
    const n = members.length;
    const threshold = getValues("proposal.threshold");
    if (n < +threshold) setValue("proposal.threshold", n);
  }, [members]);

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

      <div className="content-start border border-prim p-4 md:p-8 rounded">
        <h2 className="font-bold text-center sm:text-left text-xl mb-2">
          Proposal settings
        </h2>
        <div className="border border-prim rounded px-4">
          <div className="flex items-center py-3">
            <p>
              Proposals can be executed when {threshold} out {members.length}{" "}
              members cast their vote.
            </p>
            <button
              type="button"
              className="btn-outline-filled px-8 py-2 text-sm"
              onClick={() =>
                showModal(ThresholdForm, {
                  added: getValues("members").map((m) => m.addr),
                  initial: threshold,
                  onChange: (v) => setValue("proposal.threshold", v),
                })
              }
            >
              change
            </button>
          </div>
        </div>
        <Field<FV>
          name="proposal.threshold"
          label="Pass threshold ( % )"
          classes={{ container: "mt-8 mb-4" }}
          required
        />
        <Field<FV>
          name="proposal.duration"
          label="Duration ( hours )"
          classes={{ container: "mt-8 mb-6" }}
          required
        />
        <Toggle<FV>
          name="proposal.isAutoExecute"
          classes={{ container: "mb-4 text-sm" }}
        >
          Auto execute after passing vote
        </Toggle>
      </div>

      <NavButtons classes="mt-8" curr={2} />
    </Form>
  );
}

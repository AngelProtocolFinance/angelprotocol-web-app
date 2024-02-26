import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { FV } from "./types";
import { useProgramQuery } from "services/aws/aws";
import QueryLoader from "components/QueryLoader";
import { dateToFormFormat } from "components/form";
import { useAdminContext } from "../../Context";
import Form from "./Form";
import { schema } from "./schema";

const NEW = "new";
export default function ProgramEditor() {
  const { id: programId = "" } = useParams();
  const { id: endowId } = useAdminContext();
  const programQuery = useProgramQuery(
    { endowId, programId },
    { skip: !programId || programId === NEW }
  );

  if (programId === NEW)
    return (
      <Context
        {...{
          title: "",
          description: { length: 0, value: "" },
          image: {
            name: "",
            publicUrl: "",
            preview: "",
          },
          milestones: [],
        }}
      />
    );

  return (
    <QueryLoader
      queryState={programQuery}
      messages={{ loading: "Loading program", error: "Failed to load program" }}
    >
      {(p) => (
        <Context
          {...{
            title: p.program_title,
            description: { value: p.program_description, length: 0 },
            image: {
              name: "",
              publicUrl: p.program_banner,
              preview: p.program_banner,
            },
            initial: p,
            milestones: p.program_milestones.map((m, idx) => ({
              ...m,
              milestone_date: dateToFormFormat(new Date(m.milestone_date)),
              milestone_media: {
                name: "",
                preview: m.milestone_media,
                publicUrl: m.milestone_media,
              },
              idx,
            })),
          }}
        />
      )}
    </QueryLoader>
  );
}

function Context(props: FV) {
  const methods = useForm<FV>({
    defaultValues: props,
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
}

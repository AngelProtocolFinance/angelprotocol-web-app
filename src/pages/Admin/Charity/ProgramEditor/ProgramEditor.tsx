import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { FV } from "./types";
import { useProfileQuery } from "services/aws/aws";
import QueryLoader from "components/QueryLoader";
import { isTooltip, useAdminContext } from "../../Context";
import Form from "./Form";
import { ops } from "./ops";
import { schema } from "./schema";

const NEW = "new";
export default function ProgramEditor() {
  const { id: programId } = useParams();
  const { id: endowId } = useAdminContext();
  const profileQuery = useProfileQuery(endowId);

  if (programId === NEW)
    return (
      <Context
        {...{
          title: "",
          description: "",
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
      queryState={{
        ...profileQuery,
        data: profileQuery.data?.program.find(
          (p) => p.program_id === programId
        ),
      }}
      messages={{ loading: "Loading program", error: "Failed to load program" }}
    >
      {(program) => (
        <Context
          {...{
            title: program.program_title,
            description: program.program_description,
            image: {
              name: "",
              publicUrl: program.program_banner,
              preview: program.program_banner,
            },
            initial: program,
            milestones: program.program_milestones.map((m, idx) => ({
              ...m,
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
  const { txResource } = useAdminContext(ops);
  const methods = useForm<FV>({
    defaultValues: props,
    resolver: yupResolver(schema),
  });

  const tooltip = isTooltip(txResource) ? txResource : undefined;

  return (
    <FormProvider {...methods}>
      <Form tooltip={tooltip} />
    </FormProvider>
  );
}

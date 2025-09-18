import { valibotResolver } from "@hookform/resolvers/valibot";
import { Field, RmxForm } from "components/form";
import { Modal } from "components/modal";
import { useNavigate, useNavigation, useRouteLoaderData } from "react-router";
import { useRemixForm } from "remix-hook-form";
import type { LoaderData } from "./api";
import { type ISchema, schema } from "./schema";

export { add_action as action } from "./api";
export { ErrorModal as ErrorBoundary } from "components/error";

export default function Page() {
  const navigate = useNavigate();
  return (
    <Modal
      open={true}
      onClose={() =>
        navigate("..", { preventScrollReset: true, replace: true })
      }
      classes="p-6 fixed-center z-10 text-gray-d4 dark:text-white bg-white dark:bg-blue-d4 sm:w-full w-[90vw] sm:max-w-lg rounded-sm overflow-hidden"
    >
      <Content />
    </Modal>
  );
}

function Content() {
  const ldta = useRouteLoaderData<LoaderData>("endow-admins");
  const { admins = [] } = ldta ?? {};
  const nav = useNavigation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRemixForm<ISchema>({
    resolver: valibotResolver(schema(admins.map((a) => a.email))),
  });

  return (
    <RmxForm
      onSubmit={handleSubmit}
      disabled={nav.state !== "idle"}
      method="POST"
      className="w-full grid gap-4"
    >
      <h4 className="text-center text-xl font-bold mb-4">Invite User</h4>
      <Field
        {...register("email")}
        label="Email"
        required
        error={errors.email?.message}
      />
      <Field
        {...register("firstName")}
        label="First name"
        required
        error={errors.firstName?.message}
      />
      <Field
        {...register("lastName")}
        label="Last name"
        error={errors.lastName?.message}
        required
      />
      <button disabled={nav.state !== "idle"} className="btn btn-blue mt-6">
        Add member
      </button>
    </RmxForm>
  );
}

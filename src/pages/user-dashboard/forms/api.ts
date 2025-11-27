import type { Route } from "./+types";
import { cognito, to_auth } from ".server/auth";
import { formsdb } from ".server/aws/db";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user } = await cognito.retrieve(request);
  if (!user) return to_auth(request);

  const forms = await formsdb.forms_owned_by(user.email);
  return forms;
};

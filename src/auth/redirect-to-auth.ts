import { redirect } from "@vercel/remix";
import { appRoutes } from "constants/routes";

export const redirectToAuth = (req: Request, headers?: any) => {
  const from = new URL(req.url);
  const to = new URL(from);
  const { pathname: p, search: s } = from;
  to.pathname = appRoutes.signup;
  to.searchParams.set("redirect", p + s);
  return redirect(to.toString(), headers);
};

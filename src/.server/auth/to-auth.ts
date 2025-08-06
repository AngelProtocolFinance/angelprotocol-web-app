export const toAuth = (req: Request, headers?: Headers) => {
  const from = new URL(req.url);
  const to = new URL(from);
  const { pathname: p, search: s } = from;
  to.pathname = "/signup";
  to.searchParams.set("redirect", p + s);
  headers?.append("Location", to.toString());
  return new Response(null, {
    status: 303,
    headers,
  });
};

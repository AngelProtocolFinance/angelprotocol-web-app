import { createCookie } from "@vercel/remix";
export const regCookie = createCookie("bg-registration", { path: "/register" });

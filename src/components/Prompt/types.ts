import { PropsWithChildren } from "react";

type Base = { headline?: string; title?: string };

type ErrorProps = Base & { type: "error"; report?: string };
type DefaultProps = Base & { type?: "success" | "loading" };

export type Props = PropsWithChildren<ErrorProps | DefaultProps>;

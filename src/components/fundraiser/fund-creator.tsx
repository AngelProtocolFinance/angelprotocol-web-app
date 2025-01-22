import { Link } from "@remix-run/react";
import { appRoutes } from "constants/routes";
import * as v from "valibot";
interface IFundCreator {
  classes?: string;
  name: string;
  id: string;
}

const email = v.pipe(v.string(), v.email());
const idNum = v.pipe(
  v.string(),
  v.transform((x) => +x),
  v.number()
);

const idSchema = v.union([email, idNum]);

export function FundCreator(props: IFundCreator) {
  const id = v.parse(idSchema, props.id);

  if (typeof id === "string") {
    return <p className={props.classes}>{props.name}</p>;
  }

  return (
    <Link
      className={props.classes + " hover:text-blue-d1"}
      to={`${appRoutes.marketplace}/${props.id}`}
    >
      {props.name}
    </Link>
  );
}

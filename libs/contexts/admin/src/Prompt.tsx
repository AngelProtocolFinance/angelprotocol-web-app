import { LoaderRing } from "@ap/components";
import Icon from "@ap/components/icon";

export default function Prompt(props: { message: string; showLoader?: true }) {
  return (
    <div className="place-self-center grid content-center justify-items-center min-h-[15rem] w-full bg-white dark:bg-blue-d6 border border-prim max-w-sm p-4 rounded">
      {props.showLoader ? (
        <LoaderRing thickness={10} classes="w-28" />
      ) : (
        <Icon type="Info" size={30} />
      )}
      <p className="mt-4">{props.message}</p>
    </div>
  );
}

import { LoaderRing } from "@ap/components";
import Icon from "@ap/components/icon";

export default function Prompt(props: { message: string; showLoader?: true }) {
  return (
    <div className="place-self-center grid content-center justify-items-center">
      {props.showLoader ? (
        <LoaderRing thickness={10} classes="w-28" />
      ) : (
        <Icon type="Info" size={30} />
      )}
      <p className="mt-6">{props.message}</p>
    </div>
  );
}

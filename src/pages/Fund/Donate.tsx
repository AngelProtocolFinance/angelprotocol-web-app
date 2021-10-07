import Donator from "components/Donator/Donator";
import UserForm from "components/Donator/UserForm";
import Loader from "components/Loader/Loader";
import { SplitLiq } from "./useFund";

interface Props {
  split: SplitLiq | undefined;
  error: string;
  loading: boolean;
}

export default function Donate(props: Props) {
  if (props.loading) {
    return (
      <div className="h-40 bg-white bg-opacity-5 rounded-lg grid place-items-center">
        <Loader
          bgColorClass="bg-white-grey bg-opacity-80"
          gapClass="gap-2"
          widthClass="w-4"
        />
      </div>
    );
  } else if (props.error) {
    return (
      <div className="h-40 bg-white bg-opacity-5 rounded-lg grid place-items-center uppercase text-white-grey font-bold font-heading">
        {props.error}
      </div>
    );
  } else {
    return (
      <Donator
        to="fund"
        minSplitLiq={props.split?.min}
        maxSplitLiq={props.split?.max} //for computation of default value
      >
        <UserForm
          minSplitLiq={props.split?.min} //for Slider limits
          maxSplitLiq={props.split?.max} //cant pass from Donator except for render-prop
        />
      </Donator>
    );
  }
}

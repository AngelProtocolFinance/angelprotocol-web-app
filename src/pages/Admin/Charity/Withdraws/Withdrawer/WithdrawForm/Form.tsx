import Amounts from "./Amounts";
import Beneficiary from "./Beneficiary";
import Network from "./Network";
import Submit from "./Submit";
import Warnings from "./Warnings";
import useWithdraw from "./useWithdraw";

export default function Form() {
  const withdraw = useWithdraw();

  return (
    <form
      onSubmit={withdraw}
      autoComplete="off"
      className="flex flex-col gap-6 w-full"
      noValidate
    >
      <Amounts />
      <Network />
      <Beneficiary />
      <Warnings />
      <Submit />
    </form>
  );
}

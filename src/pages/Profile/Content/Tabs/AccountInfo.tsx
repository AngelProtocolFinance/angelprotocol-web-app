import ancIcon from "assets/images/anchor_protocol.png";

type Props = { className: string; account: any };
export function AccountInfo(props: Props) {
  return (
    <div
      className={`w-full lg:max-w-600 lg:w-3/4 min-h-r15 shadow-xl border-0 rounded-2xl p-5 ${props.className}`}
    >
      <p className="uppercase font-semibold text-white text-xl">
        {props.account.type}
      </p>
      <p className="uppercase font-bold text-white text-5xl my-5 tracking-wide">
        {props.account.balance}
      </p>
      <div className="flex justify-between w-30 h-16">
        <div className="flex flex-col items-start justify-around">
          <p className="uppercase font-bold text-white text-md">Strategy</p>
          <p className="uppercase font-normal text-white text-sm tracking-wide flex flex-row items-center gap-2">
            <img
              src={ancIcon}
              alt="anchor protocol icon"
              className="h-6 w-6 rounded-xl inline-block"
            />{" "}
            {props.account.strategy}
          </p>
        </div>
        <div className="flex flex-col items-start justify-around">
          <p className="uppercase font-bold text-white text-md">Allocation</p>
          <p className="uppercase font-normal text-white text-sm">
            {props.account.allocation}
          </p>
        </div>
      </div>
    </div>
  );
}

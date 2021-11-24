function OverviewTab() {
  return (
    <div className="w-full overflow-y-scroll lg:min-h-1/2 max-h-modal lg:py-10 lg:mt-2 2xl:mb-5 text-left">
      <span className="text-white font-normal text-md inline-block mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil atque
        dolorum dolorem. Velit pariatur tempora quasi vitae inventore natus at
        possimus. Corporis ab voluptatum consequuntur dignissimos voluptates
        harum ad quasi?
      </span>
      <span className="text-white font-normal text-md inline-block mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil atque
        dolorum dolorem. Velit pariatur tempora quasi vitae inventore natus at
        possimus. Corporis ab voluptatum consequuntur dignissimos voluptates
        harum ad quasi?
      </span>
      <span className="text-white font-normal text-md inline-block mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil atque
        dolorum dolorem. Velit pariatur tempora quasi vitae inventore natus at
        possimus. Corporis ab voluptatum consequuntur dignissimos voluptates
        harum ad quasi?
      </span>
      <span className="text-white font-normal text-md inline-block mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil atque
        dolorum dolorem. Velit pariatur tempora quasi vitae inventore natus at
        possimus. Corporis ab voluptatum consequuntur dignissimos voluptates
        harum ad quasi?
      </span>
    </div>
  );
}

function AccountInfo({
  className,
  account,
}: {
  className: string;
  account: any;
}) {
  return (
    <div
      className={`w-124 min-h-r15 shadow-xl border-0 rounded-2xl p-5 ${className}`}
    >
      <p className="uppercase font-semibold text-white text-xl">
        {account.type}
      </p>
      <p className="uppercase font-bold text-white text-7xl my-5 tracking-wide">
        {account.balance}
      </p>
      <div className="flex justify-between w-30 h-16">
        <div className="flex flex-col items-start justify-around">
          <p className="uppercase font-semibold text-white text-md">Strategy</p>
          <p className="uppercase font-normal text-white text-xs">
            {account.strategy}
          </p>
        </div>
        <div className="flex flex-col items-start justify-around">
          <p className="uppercase font-semibold text-white text-md">
            Allocation
          </p>
          <p className="uppercase font-normal text-white text-xs">
            {account.allocation}
          </p>
        </div>
      </div>
    </div>
  );
}
function AccountAction() {
  return (
    <div className="flex flex-col items-start lg:justify-end gap-2 w-115 min-h-r15">
      <div>
        <button className="capitalize bg-green-400 text-white font-semibold rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center">
          Withdraw (current)
        </button>
      </div>
      <div>
        <button className="capitalize bg-gray-300 text-white font-semibold rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center">
          Change (Strategy)
        </button>
      </div>
    </div>
  );
}

function CharityEndowmentInfo() {
  return (
    <div className="w-full overflow-y-scroll lg:min-h-1/2 lg:mt-5 text-left pb-10">
      <div className="flex justify-between w-124 md:w-full min-h-r15 bg-white shadow-xl border-0 rounded-2xl p-5 mb-2">
        <div className="endowment_stats min-h-sm w-115 md:w-122">
          <p className="uppercase font-semibold text-thin-blue text-xl">
            Endowment Balance
          </p>
          <p className="uppercase font-bold text-thin-blue text-7xl my-5">
            $5,023
          </p>
          <p className="uppercase font-medium text-thin-blue text-sm">
            Total donations
          </p>
          <p className="uppercase font-semibold text-thin-blue text-3xl">154</p>
        </div>
        <div className="endowment_graph flex-grow bg-blue-100 hidden lg:block">
          <p className="text-center">Charts</p>
        </div>
      </div>
      <div className="flex gap-2 flex-col lg:flex-row">
        {mockAccountDetails.map((account) => (
          <AccountInfo
            account={account}
            className={`${account.color}`}
          ></AccountInfo>
        ))}
        <AccountAction />
      </div>
    </div>
  );
}

function CharityPrograms() {
  function ProgramItem() {
    return (
      <div className="flex justify-between gap-5 w-full h-40 font-heading">
        <div className="w-128 h-full bg-blue-200"></div>
        <div className="w-full flex-grow h-full text-white">
          <p className="uppercase text-2xl font-medium tracking-wide m-0">
            Program name
          </p>
          <span className="text-xs inline-block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            perspiciatis alias facilis dolorem! Eum non temporibus porro itaque
            aliquam beatae laudantium quaerat ex dolor atque. Porro non id vel
            aliquam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Sequi perspiciatis alias facilis dolorem! Eum non temporibus porro
            itaque aliquam beatae laudantium quaerat ex dolor atque. Porro non
            id vel aliquam. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Sequi perspiciatis alias facilis dolorem! Eum non temporibus
            porro itaque aliquam beatae laudantium quaerat ex dolor atque. Porro
            non id vel aliquam.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full overflow-y-scroll lg:min-h-1/2 lg:mt-5 text-left pb-10">
      <ProgramItem></ProgramItem>
      <ProgramItem></ProgramItem>
      <ProgramItem></ProgramItem>
    </div>
  );
}

export default function CharityInfoTab({
  activeTab = "overview",
}: {
  activeTab: string;
}) {
  return (
    <>
      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "endowment" && <CharityEndowmentInfo />}
      {activeTab === "programs" && <CharityPrograms />}
      {activeTab === "media" && <OverviewTab />}
      {activeTab === "governance" && <OverviewTab />}
    </>
  );
}

const mockAccountDetails = [
  {
    type: "current account",
    balance: "$1,023",
    strategy: "anchor protocol",
    allocation: "60%",
    color: "bg-green-400",
  },
  {
    type: "princiapl account",
    balance: "$4,023",
    strategy: "anchor protocol",
    allocation: "60%",
    color: "bg-orange",
  },
];

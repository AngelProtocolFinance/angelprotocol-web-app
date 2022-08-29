import { Popover } from "@headlessui/react";
import { ButtonHTMLAttributes } from "react";
import { Submitter } from "../types";
import { Charity } from "types/server/aws";
import { Button } from "pages/Registration/common";
import { useRegistrationState } from "services/aws/registration";
import ChainGuard, { ChainGuardProps } from "contexts/ChainGuard";
import Icon from "components/Icon";
import { chainIds, chainNames } from "constants/chainIds";
import getRegistrationState from "../getRegistrationState";

export default function Submit(props: {
  onSubmit: Submitter;
  isSubmitting?: boolean;
}) {
  const { data } = useRegistrationState("");
  const charity = data!;
  const status = charity.Registration.RegistrationStatus;
  const state = getRegistrationState(charity);

  if (status !== "Inactive") {
    return (
      <div className="flex w-9/12 items-center justify-end rounded-md border-2 border-white border-solid p-2 px-9 font-bold">
        <p className="ml-3 mr-auto">Status of Your Endowment</p>

        <p className="flex items-center justify-center w-40 h-10 mr-40 uppercase text-yellow-500">
          {status}
        </p>
      </div>
    );
  }

  return (
    <ChainGuard
      allowedWallets={["keplr"]}
      requiredNetwork={{ id: chainIds.juno, name: chainNames.juno }}
      prompt={(status) => (
        <div className="relative w-full md:w-2/3 mt-5">
          <Button
            className="w-full h-10 bg-yellow-blue"
            onClick={() => props.onSubmit(charity, status.wallet!)}
            disabled={
              !state.getIsReadyForSubmit() ||
              props.isSubmitting ||
              status.id !== "verified"
            }
          >
            Submit for review
          </Button>
          {status.id !== "verified" && (
            <Popover>
              <Popover.Button className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <Icon
                  type="Warning"
                  size={18}
                  className="text-rose-400 hover:text-rose-300"
                />
              </Popover.Button>
              <Popover.Panel
                className={
                  "fixed-center z-10 bg-zinc-50 text-zinc-800 p-4 rounded-md"
                }
              >
                {status.content}
              </Popover.Panel>
            </Popover>
          )}
        </div>
      )}
    />
  );
}

function WalletButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <ChainGuard
      allowedWallets={["keplr"]}
      requiredNetwork={{ id: chainIds.juno, name: chainNames.juno }}
      prompt={(status) => {
        if (status.id === "verified") {
          return <></>;
        }

        return <></>;
        // <div className="relative w-full md:w-2/3 mt-5">
        //   <Button
        //     className="w-full h-10 bg-yellow-blue"
        //     onClick={() => props.onSubmit(charity, status.wallet!)}
        //     disabled={
        //       !state.getIsReadyForSubmit() ||
        //       props.isSubmitting ||
        //       status.id !== "verified"
        //     }
        //   >
        //     Submit for review
        //   </Button>
        //   {status.id !== "verified" && (
        //     <Popover>
        //       <Popover.Button className="absolute top-1/2 right-4 transform -translate-y-1/2">
        //         <Icon
        //           type="Warning"
        //           size={18}
        //           className="text-rose-400 hover:text-rose-300"
        //         />
        //       </Popover.Button>
        //       <Popover.Panel
        //         className={
        //           "fixed-center z-10 bg-zinc-50 text-zinc-800 p-4 rounded-md"
        //         }
        //       >
        //         {status.content}
        //       </Popover.Panel>
        //     </Popover>
        //   )}
        // </div>
      }}
    />
  );
}

import ChainGuard from "contexts/ChainGuard";
import ModalContext from "contexts/ModalContext";
import { chainIds } from "constants/chainIds";
import { Guard, GuardPrompt } from "./Guard";
import Nav from "./Nav";
import Views from "./Views";

export default function Admin() {
  return (
    <ChainGuard
      allowedWallets={["keplr"]}
      prompt={({ id, content }) => (
        <div className="bg-zinc-50 place-self-center w-full max-w-sm p-4 rounded-md shadow-lg min-h-[10rem]">
          {content}
        </div>
      )}
      requiredNetwork={{ id: chainIds.juno, name: "Juno" }}
    >
      <Guard>
        {/**modals in this scope can access AdminGuard context value */}
        <ModalContext backdropClasses="z-10 fixed inset-0 bg-black/50">
          <div className="padded-container grid grid-rows-[auto_1fr] pb-4 gap-2">
            <Nav />
            <Views />
          </div>
        </ModalContext>
      </Guard>
    </ChainGuard>
  );
}

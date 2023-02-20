import { ModalContext } from "@ap/contexts";
import Guard from "@ap/contexts/admin";
import Charity from "./Charity";
import Core from "./Core";
import Review from "./Review";

export default function Admin() {
  return (
    <Guard>
      {(resources) => (
        /**modals in this scope can access AdminGuard context value */
        <ModalContext>
          {(() => {
            switch (resources.type) {
              case "charity":
                return <Charity />;
              case "review":
                return <Review />;
              default:
                return <Core />;
            }
          })()}
        </ModalContext>
      )}
    </Guard>
  );
}

import ModalContext from "contexts/ModalContext";
import Charity from "./Charity";
import Core from "./Core";
import { Guard } from "./Guard";
import Review from "./Review";

export default function Admin() {
  return (
    <Guard>
      {(resources) => (
        /**modals in this scope can access AdminGuard context value */
        <ModalContext>
          {(() => {
            switch (resources.role) {
              case "charity":
                return <Charity />;
              case "reviewer":
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

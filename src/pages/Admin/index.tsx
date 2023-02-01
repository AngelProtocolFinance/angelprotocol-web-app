import ModalContext from "contexts/ModalContext";
import Charity from "./Charity";
import Core from "./Core";
import { Guard } from "./Guard";
import Review from "./Review";

export default function Admin() {
  return (
    <Guard>
      {(resource) => (
        /**modals in this scope can access AdminGuard context value */
        <ModalContext>
          {(() => {
            switch (resource.type) {
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

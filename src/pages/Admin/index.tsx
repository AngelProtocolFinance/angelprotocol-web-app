import ModalContext from "contexts/ModalContext";
import Charity from "./Charity";
import { Context } from "./Context";
import Core from "./Core";
import Review from "./Review";

export default function Admin() {
  return (
    <Context>
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
    </Context>
  );
}

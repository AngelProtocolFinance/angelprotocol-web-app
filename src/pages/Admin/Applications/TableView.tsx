import { useModalContext } from "components/ModalContext/ModalContext";
import TableSection, { Cells } from "components/TableSection/TableSection";
import Reviewer from "./Previewer";
import { CharityApplication } from "./types";

export default function TableView(props: {
  applications: CharityApplication[];
}) {
  const { showModal } = useModalContext();
  const openReviewer = (ap: CharityApplication) =>
    showModal(Reviewer, { application: ap });
  return (
    <table className="w-full text-white/80 overflow-hidden hidden sm:table">
      <TableSection type="thead" rowClass="flex inline-block">
        <Cells
          type="th"
          cellClass="px-2 first:pl-0 last:pr-0 text-left flex-1 uppercase bg-gray-200/20 py-2"
        >
          <>Name</>
          <>Contact Email</>
          <>Registration Date</>
          <>Wallet Address</>
          <></>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="hover:bg-angel-blue hover:bg-angel-blue/10 mb-6 sm:mb-0 flex flex-row flex-no-wrap"
      >
        {props.applications.map((ap) => (
          <Cells
            type="td"
            cellClass="p-2 first:pl-0 last:pr-0 group pl-4 pt-8 sm:pt-2 pb-2 text-left relative w-full border-grey-accent/30 border-t border-l border-b border-r sm:flex-1"
            key={ap.PK}
          >
            <p className="pl-1 capitalize w-42 sm:w-32">{ap.CharityName}</p>
            <p className="text-base font-bold w-42 sm:w-32 truncate">
              {ap.CharityName_ContactEmail}
            </p>
            <p className="text-base w-42 sm:w-32">
              {new Date(ap.RegistrationDate).toDateString()}
            </p>
            <p className="font-mono flex justify-between items-center w-42 sm:w-32">
              <span className="text-base truncate w-22">{ap.TerraWallet}</span>
            </p>
            <div className="w-42 sm:w-32">
              <button
                onClick={() => openReviewer(ap)}
                className="px-3 pt-1.5 pb-1 text-white-grey bg-angel-blue hover:bg-bright-blue font-heading text-sm uppercase text-center rounded-md"
              >
                Review
              </button>
            </div>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}

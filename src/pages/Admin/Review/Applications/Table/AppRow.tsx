import { CharityApplication } from "types/aws";
import { useModalContext } from "contexts/ModalContext";
import { Cells } from "components/TableSection";
import { statusColors } from "../constants";
import Application from "./Application";

export default function AppRow(props: CharityApplication) {
  const { showModal } = useModalContext();
  return (
    <Cells type="td" cellClass="px-2 py-3" key={props.PK}>
      <>{props.CharityName}</>
      <>{props.CharityName_ContactEmail?.split("_")[1]}</>
      <>{new Date(props.RegistrationDate).toDateString()}</>
      <span
        className={`${
          statusColors[props.RegistrationStatus].text
        } uppercase text-sm`}
      >
        {props.RegistrationStatus}
      </span>

      <button
        onClick={() => showModal(Application, props)}
        className="uppercase font-heading font-bold text-sm hover:text-angel-blue active:text-angel-orange"
      >
        Review
      </button>
    </Cells>
  );
}

import { CharityApplication } from "types/server/aws";
import { useModalContext } from "contexts/ModalContext";
import Reviewer from "./Previewer";

export default function ListView(props: {
  applications: CharityApplication[];
}) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 sm:hidden">
      {props.applications.map((ap) => (
        <ApplicationCard ap={ap} key={ap.PK} />
      ))}
    </ul>
  );
}

const ApplicationCard = (props: { ap: CharityApplication }) => {
  const { showModal } = useModalContext();
  const openReviewer = () => showModal(Reviewer, { application: props.ap });
  return (
    <li className="w-full border-grey-accent/30 border-t border-l border-b border-r mb-10">
      <p className="capitalize w-42">
        <Text colored title="Name" />
        <Text title={props.ap.CharityName} />
      </p>
      <p className="text-base font-bold w-42 truncate">
        <Text colored title="Contact Email" />
        <Text title={props.ap.CharityName_ContactEmail} />
      </p>
      <p className="text-base w-42">
        <Text colored title="Registration Date" />
        <Text title={new Date(props.ap.RegistrationDate).toDateString()} />
      </p>
      <p className="fw-42">
        <Text colored title="Wallet Address" />
        <Text title={props.ap.JunoWallet || "-"} />
      </p>
      <div className="w-42">
        <Text colored title="Click to review" />
        <button
          onClick={openReviewer}
          className="px-3 pt-1.5 pb-1 ml-2 my-2 text-white-grey bg-angel-blue hover:bg-bright-blue font-heading text-sm uppercase text-center rounded-md"
        >
          Review
        </button>
      </div>
    </li>
  );
};

function Text(props: { title: string; colored?: boolean }) {
  return (
    <span
      className={`block text-white inset-x-0 p-1 pl-2 ${
        props.colored
          ? "bg-gray-200/20 text-xs tracking-wider uppercase"
          : "text-md font-semibold"
      }`}
    >
      {props.title}
    </span>
  );
}

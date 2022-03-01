import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal, { useSetModal } from "./Modal";
import { MdOutlineClose } from "react-icons/md";

describe("<Modal/> renders correctly", () => {
  window.scrollTo = jest.fn();

  test("<Modal /> is triggered and opened", async () => {
    render(
      <Modal classes="ap-modal bg-black bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 z-50 grid place-items-center">
        <TriggerModal />
      </Modal>
    );

    // find tigger modal button
    const button = await screen.findByText(/show modal/i);
    expect(button).toBeInTheDocument();

    // click button to show modal and render it's content
    userEvent.click(button);
    const modalContent = await screen.findByText(/Modal content is here/);
    expect(modalContent).toBeInTheDocument();
  });
});

const ModalContent = (props: { inModal: boolean }) => {
  const { hideModal: close } = useSetModal();
  return (
    <div
      className={`relative w-full max-w-md ${
        props.inModal ? "bg-white-grey rounded-md overflow-hidden pt-4" : ""
      }`}
    >
      {props.inModal && (
        <button
          onClick={close}
          className="absolute right-2 top-2 text-angel-grey hover:text-black"
        >
          <MdOutlineClose size={25} />
        </button>
      )}
      <div>
        <p>Modal content is here</p>
      </div>
    </div>
  );
};

const TriggerModal = () => {
  const { showModal } = useSetModal();

  const openModal = () => {
    showModal(ModalContent, { inModal: true });
  };
  return <button onClick={openModal}>show modal</button>;
};

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal, { useSetModal } from "./Modal";
import { MdOutlineClose } from "react-icons/md";
import { act } from "react-dom/test-utils";

const modalCssClass =
  "ap-modal bg-black bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 z-50 grid place-items-center";

describe("<Modal/> renders correctly", () => {
  test("<Modal /> is triggered and opened", async () => {
    render(
      <Modal classes={modalCssClass}>
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

    // find modal close button and click to close the modal
    const closeIconButton = (await screen.findAllByRole("button"))[0];
    userEvent.click(closeIconButton);
    expect(modalContent).not.toBeInTheDocument();
  });
});

describe("<Modal/> is Dismissed", () => {
  test("<Modal /> is closed on Escape key press", async () => {
    render(
      <Modal classes={modalCssClass}>
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

    // press the escape key to close the modal
    userEvent.keyboard("Escape");
    fireEvent.keyDown(modalContent, { key: "Escape" });
    expect(modalContent).not.toBeInTheDocument();
  });

  test("<Modal /> is closed on backdrop dismiss click", async () => {
    render(
      <Modal classes={modalCssClass}>
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

    // click on the modal wrapper to close the modal
    const wrapper = await screen.findByRole("alertdialog");
    act(() => {
      userEvent.click(wrapper);
    });
    expect(modalContent).not.toBeInTheDocument();
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

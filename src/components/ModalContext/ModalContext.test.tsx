import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalContext, { useModalContext } from "./ModalContext";

describe("<Modal/> context operations", () => {
  test("open and close via button", () => {
    render(<IsolatedTrigger />);

    // find tigger modal button
    const button = screen.getByRole("button");

    // click button to show modal and render it's content
    userEvent.click(button);
    const modalContent = screen.getByText(/modal content/i);
    expect(modalContent).toBeInTheDocument();

    // find modal close button and click to close the modal
    const closeButton = screen.getAllByRole("button")[0];
    userEvent.click(closeButton);
    expect(modalContent).not.toBeInTheDocument();
  });

  test("close on Escape press", () => {
    render(<IsolatedTrigger />);

    // find tigger modal button
    const button = screen.getByRole("button");

    // click button to show modal and render it's content
    userEvent.click(button);
    const modalContent = screen.getByText(/modal content/i);
    expect(modalContent).toBeInTheDocument();

    //press the escape key to close the modal
    userEvent.keyboard("{Escape}");
    expect(modalContent).not.toBeInTheDocument();
  });

  test("close on backdrop click", () => {
    render(<IsolatedTrigger />);

    // find tigger modal button
    const button = screen.getByRole("button");

    // click button to show modal and render it's content
    userEvent.click(button);
    const modalContent = screen.getByText(/modal content/i);
    expect(modalContent).toBeInTheDocument();

    // click on the modal wrapper to close the modal
    const wrapper = screen.getByRole("alertdialog");
    userEvent.click(wrapper);
    expect(modalContent).not.toBeInTheDocument();
  });
});

function IsolatedTrigger() {
  return (
    <ModalContext backdropClasses="">
      <ModalTrigger />
    </ModalContext>
  );
}

const Modal = () => {
  const { closeModal: close } = useModalContext();
  return (
    <div>
      <p>modal content</p>
      <button onClick={close}>close modal</button>
    </div>
  );
};

const ModalTrigger = () => {
  const { showModal } = useModalContext();
  const openModal = () => {
    showModal(Modal, { inModal: true });
  };
  return <button onClick={openModal}>show modal</button>;
};

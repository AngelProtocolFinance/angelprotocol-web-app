import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalContext, { useModalContext } from "./ModalContext";

describe("<Modal/> context operations", () => {
  test("open and close via button", () => {
    render(<IsolatedTrigger />);
    //open modal
    const openButton = screen.getByRole("button");
    userEvent.click(openButton);

    //successfully selecting close button means modal is rendered
    const closeButton = screen.getAllByRole("button")[0];
    userEvent.click(closeButton);
    expect(closeButton).not.toBeInTheDocument();
  });

  test("focus is trapped inside modal", async () => {
    render(<IsolatedTrigger />);
    //open modal
    const openButton = screen.getByRole("button");
    userEvent.click(openButton);

    await waitFor(() => {
      expect(openButton).toHaveFocus();
    });

    const closeButton = screen.getAllByRole("button")[0];
    const textBox = screen.getByRole("textbox");

    //focus on textbox
    userEvent.tab();
    expect(textBox).toHaveFocus();
    //focus should go back to closeButton
    userEvent.tab();
    expect(closeButton).toHaveFocus();
  });

  test("Pressing enter on focused closeButton closes the modal, focus falls back to opener", async () => {
    render(<IsolatedTrigger />);
    const openButton = screen.getByRole("button");
    //open modal
    userEvent.click(openButton);
    const modalContent = screen.getByText(/modal content/i);
    expect(modalContent).toBeInTheDocument();
    //at this point the closeButton is focused

    await waitFor(() => {
      expect(openButton).toHaveFocus();
    });

    userEvent.keyboard("{Enter}");
    expect(modalContent).not.toBeInTheDocument();
  });

  test("close on Escape press, focus falls back to opener", () => {
    render(<IsolatedTrigger />);
    // find tigger modal button
    const openButton = screen.getByRole("button");
    // click button to show modal and render it's content
    userEvent.click(openButton);
    const modalContent = screen.getByText(/modal content/i);
    expect(modalContent).toBeInTheDocument();
    //press the escape key to close the modal
    userEvent.keyboard("{Escape}");
    expect(modalContent).not.toBeInTheDocument();
    //focus goes back to opener
    expect(openButton).toHaveFocus();
  });

  test("close on backdrop click", () => {
    render(<IsolatedTrigger />);
    // find tigger modal button
    const button = screen.getByRole("button");
    userEvent.click(button);

    //successfully selecting wrapper means modal is opened
    const wrapper = screen.getByRole("alertdialog");
    userEvent.click(wrapper);
    expect(wrapper).not.toBeInTheDocument();
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
      <input type="text" />
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

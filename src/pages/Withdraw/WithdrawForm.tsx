import { useState } from "react";
import Modal from "react-modal";
import { Formik, Form } from "formik";
import Slider from "rc-slider";
import Estimates from "./Estimates";
import Results from "./Results";
import Popup from "./Popup";
import Loader from "components/Loader/Loader";
import toCurrency from "helpers/toCurrency";
import useHoldings from "./useHoldings";
import useWithdrawHoldings from "./useWithdrawHoldings";
import useConfirmWithdraw from "./useConfirmWithdraw";
import { useGetStatus, useSetStatus } from "./Withdraw";
import { Steps, Values, WithdrawProps } from "./types";

export default function WithdrawForm(props: WithdrawProps) {
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [withdrawTokenQty, setWithdrawTokenQty] = useState("");

  const { liquidCW20Tokens, anchorVault } = useHoldings(props.address);
  const status = useGetStatus();
  const setStatus = useSetStatus();

  const computeWithdrawAmount = (value: number) => {
    // value is the percentage based on the slider
    setWithdrawAmount((props.liquid! * value) / 100);
    setWithdrawTokenQty(
      Math.round((liquidCW20Tokens! * value) / 100).toString()
    );
  };

  const handleWithdrawHoldings = useWithdrawHoldings(
    status,
    setStatus,
    props.address,
    anchorVault,
    withdrawAmount,
    withdrawTokenQty
  );

  const handleConfirmWithdraw = useConfirmWithdraw(
    setStatus,
    props.address,
    anchorVault,
    withdrawAmount,
    withdrawTokenQty
  );

  function onModalClose() {
    setWithdrawAmount(0);
    setStatus({
      step: Steps.initial,
    });
    props.onCloseModal();
  }

  function onWithdrawSuccess() {
    setStatus({
      step: Steps.initial,
    });
    props.onCloseModal();
    window.location.reload();
  }

  switch (status.step) {
    case Steps.initial: {
      return (
        <Modal
          isOpen={props.isModalOpened}
          ariaHideApp={false}
          className="absolute bg-gray-400 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 z-50 grid place-items-center"
        >
          <div className="p-3 md:p-6 bg-white-grey w-full max-w-xs min-h-r15 rounded-xl shadow-lg overflow-hidden relative">
            <h3 className="mb-1 text-lg text-angel-grey text-center font-semibold font-heading">
              Withdraw from Accounts
            </h3>
            <p className="mb-3 md:mb-6 text-angel-grey text-center text-xs">
              Enter the quantity of tokens to withdraw from each of the active
              Liquid Account's current strategies.
            </p>
            <div className="text-angel-grey">
              <Formik<Values>
                initialValues={{ withdraw: "0" }}
                onSubmit={handleWithdrawHoldings}
              >
                <Form>
                  <div className="flex flex-row justify-around mb-3">
                    <div>
                      <div className="my-1.5">
                        <label htmlFor="withdraw">Anchor Protocol</label>
                      </div>
                      <div className="align-bottom">
                        <p className="text-xs italic">
                          Available: {toCurrency(liquidCW20Tokens! / 1e6)}
                          {} tokens
                        </p>
                        <p className="text-xs italic">
                          (~$ {toCurrency(props.liquid)})
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="my-3">
                        <Slider
                          min={0}
                          max={100}
                          defaultValue={0}
                          onChange={computeWithdrawAmount}
                        />
                      </div>
                      <div className="align-bottom">
                        <p className="text-xs italic py-px">
                          Withdraw Amt: ~$ {toCurrency(withdrawAmount)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row mt-6">
                    <button
                      type="submit"
                      className="m-auto uppercase hover:bg-blue-accent bg-angel-blue rounded-lg w-28 h-8 text-white-grey text-sm font-bold"
                    >
                      Withdraw
                    </button>
                    <button
                      onClick={onModalClose}
                      className="m-auto uppercase hover:bg-angel-orange hover:text-white-grey hover:border-opacity-0 rounded-lg w-28 h-8 text-angel-orange border-2 border-angel-orange text-sm font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </Modal>
      );
    }

    case Steps.error: {
      return (
        <Modal
          isOpen={props.isModalOpened}
          ariaHideApp={false}
          className="absolute bg-gray-400 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 z-50 grid place-items-center"
        >
          <Popup message={status?.message} onCloseModal={onModalClose} />
        </Modal>
      );
    }

    case Steps.no_result: {
      return (
        <Modal
          isOpen={props.isModalOpened}
          ariaHideApp={false}
          className="absolute bg-gray-400 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 z-50 grid place-items-center"
        >
          <Popup message={status?.message} onCloseModal={onModalClose}>
            <a href={status.url} target="_blank" rel="noopener noreferrer">
              Check results manually
            </a>
          </Popup>
        </Modal>
      );
    }

    case Steps.confirm: {
      return (
        <Modal
          isOpen={props.isModalOpened}
          ariaHideApp={false}
          className="absolute bg-gray-400 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 z-50 grid place-items-center"
        >
          <Estimates
            handleConfirm={handleConfirmWithdraw}
            onCloseModal={onModalClose}
          />
        </Modal>
      );
    }

    case Steps.waiting: {
      return (
        <Modal
          isOpen={props.isModalOpened}
          ariaHideApp={false}
          className="absolute bg-gray-400 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 z-50 grid place-items-center"
        >
          <Popup message={status?.message} onCloseModal={onModalClose}>
            <Loader
              widthClass="w-4"
              gapClass="gap-2"
              bgColorClass="bg-angel-grey"
            />
          </Popup>
        </Modal>
      );
    }

    case Steps.success: {
      return (
        <Modal
          isOpen={props.isModalOpened}
          ariaHideApp={false}
          className="absolute bg-gray-400 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 z-50 grid place-items-center"
        >
          <Results onCloseModal={onWithdrawSuccess} />
        </Modal>
      );
    }

    default:
      return null;
  }
}

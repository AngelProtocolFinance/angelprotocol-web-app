import { useState } from "react";
import contracts from "../contracts";
import Slider from "rc-slider";
import Modal from "react-modal";
import { FaFacebookSquare, FaLinkedin, FaTwitter } from "react-icons/fa";
import "rc-slider/assets/index.css";

import {
  useConnectedWallet,
  UserDenied,
  CreateTxFailed,
  TxFailed,
  Timeout,
  TxUnspecifiedError,
} from "@terra-money/wallet-provider";

import {
  CreateTxOptions,
  MsgExecuteContract,
  StdFee,
} from "@terra-money/terra.js";

interface DonationFormProps {
  pushTransactionStatus: any;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "30%",
    minHeight: "300px",
  },
};

export function DonationForm(props: DonationFormProps) {
  const { pushTransactionStatus } = props;

  const [isTypingAmount, setIsTypingAmount] = useState(false);
  const [amountToDonate, setAmountToDonate] = useState(0);
  const [amountTyped, setAmountTyped] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const connectedWallet = useConnectedWallet();
  let isSubmitDonation = false;

  const currentNetwork = "localterra"; // TODO: should be:
  // const currentNetwork = connectedWallet.network.name

  function openShareModal() {
    setIsOpen(true);
  }

  function closeShareModal() {
    setIsOpen(false);
  }

  const setAmount = (event: any) => {
    setAmountToDonate(event.target.value);
    setIsTypingAmount(false);
  };

  const onSliderChange = (value: any) => {
    setPercentage(value);
  };

  const onAfterChange = (value: any) => {};

  const donate = async () => {
    isSubmitDonation = true;
    if (!connectedWallet) return; // TODO (borodanov): should be:
    // const currentNetwork = connectedWallet.network.name

    const execute = new MsgExecuteContract(
      connectedWallet.terraAddress,
      contracts.AngelProtocolIndexFund.address[currentNetwork],
      contracts.AngelProtocolIndexFund.handleMessages.depositDonor
    );

    const txOptions: CreateTxOptions = {
      msgs: [execute],
      fee: new StdFee(200000, { uluna: 1000000 }), // TODO (borodanov): adjust fee
    };

    try {
      const result = await connectedWallet.post(txOptions);
      pushTransactionStatus(
        `Transaction success with txhash: ${result.result.txhash}`
      );
      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
      if (error instanceof UserDenied) {
        pushTransactionStatus("User Denied");
      } else if (error instanceof CreateTxFailed) {
        pushTransactionStatus("Create Tx Failed");
        pushTransactionStatus(error.message);
        pushTransactionStatus(error.tx);
      } else if (error instanceof TxFailed) {
        pushTransactionStatus("Tx Failed");
        pushTransactionStatus(error.txhash);
        pushTransactionStatus(error.message);
        pushTransactionStatus(error.raw_message);
        pushTransactionStatus(error.tx);
      } else if (error instanceof Timeout) {
        pushTransactionStatus("Timeout");
        pushTransactionStatus(error.message);
      } else if (error instanceof TxUnspecifiedError) {
        pushTransactionStatus(error.message);
        pushTransactionStatus(error.tx);
      } else {
        pushTransactionStatus(String(error));
      }
    }
  };

  return (
    <div>
      <p className="text-xl">Choose the amount of your donation:</p>
      <div className="options-amount mt-4 mb-6">
        <div className="flex justify-between w-3/5">
          <div className="option-amount w-max">
            <input
              type="radio"
              name="amount"
              value={5}
              className="mr-1"
              onChange={setAmount}
            />
            $5
          </div>
          <div className="option-amount w-max">
            <input
              type="radio"
              name="amount"
              value={20}
              className="mr-1"
              onChange={setAmount}
            />
            $20
          </div>
          <div className="option-amount w-max">
            <input
              type="radio"
              name="amount"
              value={50}
              className="mr-1"
              onChange={setAmount}
            />
            $50
          </div>
          <div className="option-amount">
            <input
              type="radio"
              name="amount"
              value={100}
              className="mr-1"
              onChange={setAmount}
            />
            $100
          </div>
          <div className="option-amount">
            <input
              type="radio"
              name="amount"
              value={1000}
              className="mr-1"
              onChange={setAmount}
            />
            $1000
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="radio"
            name="amount"
            value=""
            className="mr-2"
            onChange={() => setIsTypingAmount(true)}
          />
          <div className="rounded-md h-10 border-gray-300 p-2 bg-white">
            <input
              className="border-transparent outline-none text-black"
              type="number"
              placeholder="Other Amount"
              name="amount"
              value={amountTyped}
              onChange={(e) => setAmountTyped(parseInt(e.target.value))}
              disabled={!isTypingAmount}
            />
          </div>
        </div>
      </div>
      <div className="percentage-slider">
        <p className="text-xl mt-2">
          How much of your donation should be compounded forever for Women for
          Women International?
        </p>
        <div className="flex items-center w-full my-2">
          <div className="w-2/5 mr-5">
            <p className="text-xs">
              Percentage<span className="text-sm text-dark-red">*</span>
            </p>
            <Slider
              value={percentage}
              onChange={onSliderChange}
              onAfterChange={onAfterChange}
              className="w-full h-4 my-3"
            />
            <div className="flex justify-between items-center text-xs">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
          <p className="text-xl text-thin-blue">{percentage}%</p>
        </div>
      </div>
      <div className="button-area">
        {isSubmitDonation ? (
          isSuccess ? (
            <div className="success-area">
              <button className="uppercase bg-leaf-green rounded-xl w-56 h-12 d-flex justify-center items-center mb-4">
                Success
              </button>
              <span className="text-leaf-green text-md mx-4">
                Thank you for your donation!
              </span>
              <button
                className="uppercase bg-thin-blue rounded-xl w-48 h-12 d-flex justify-center items-center mb-4"
                onClick={openShareModal}
              >
                Share
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeShareModal}
                contentLabel="Example Modal"
                style={customStyles}
              >
                <div className="flex justify-center">
                  <div className="p-4  mx-auto">
                    <div className="flex justify-end">
                      <button
                        onClick={closeShareModal}
                        className="text-xl justify-end"
                      >
                        X
                      </button>
                    </div>
                    <p className="text-5xl uppercase text-thin-blue mb-6 text-center font-bold">
                      let the world know!
                    </p>
                    <div className="rounded-xl bg-white-grey p-3 w-2/3 flex justify-center mx-auto">
                      <span className="text-grey text-sm">
                        I just donated $xxx on @Angel Protocol! Every gift is
                        invested to provide sustainable funding for non-profits:
                        Give once, give forever. Please join me in providing
                        charities with financial freedom:
                        https://app.angelprotocol.io
                      </span>
                    </div>
                    <div className="flex justify-center my-5 text-3xl text-thin-blue">
                      <div className="flex justify-center items-center rounded-full border-thin-blue p-2 border-2 border-solid mx-1">
                        <FaTwitter />
                      </div>
                      <div className="flex justify-center items-center rounded-full border-thin-blue p-2 border-2 border-solid mx-1">
                        <FaLinkedin />
                      </div>
                      <div className="flex justify-center items-center rounded-full border-thin-blue p-2 border-2 border-solid mx-1">
                        <FaFacebookSquare />
                      </div>
                    </div>
                    <div className="flex justify-center mx-auto mt-2">
                      <button className="uppercase bg-thin-blue rounded-xl w-48 h-12 d-flex justify-center items-center mb-4">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          ) : (
            <div className="failed-area">
              <button className="uppercase bg-failed-red rounded-xl w-56 h-12 d-flex justify-center items-center mb-4">
                Declined
              </button>
              <span className="text-failed-red text-md mx-4">
                Something went wrong. Please try again in a few minutes
              </span>
            </div>
          )
        ) : (
          <button
            className="uppercase bg-orange rounded-xl w-56 h-12 d-flex justify-center items-center mb-4"
            disabled={!connectedWallet || !connectedWallet.availablePost}
            onClick={donate}
          >
            Donate
          </button>
        )}
      </div>
    </div>
  );
}

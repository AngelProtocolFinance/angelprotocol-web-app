// import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useSetModal } from "components/Nodal/Nodal";
import SwapForm from "./SwapForm";
import SwapHeader from "./SwapHeader";
import { HALO, UST } from "constants/currency";
import { useState, useEffect } from "react";
import usePair, { TokenResult } from "./usePair";
import { Pair, PairResult } from "contracts/types";
import { saleAssetFromPair } from "./assetPairs";

export default function Swap() {
  // connect modal
  // useContractAddress hook to get symbol & native tokens
  // hook to interact with apis
  // const { post: terraExtensionPost } = useWallet();
  // settings modal to change swap settings
  // slippage hook (localstorage)
  const [currentPair, setCurrentPair] = useState<PairResult>();
  const [saleTokenInfo, setSaleTokenInfo] = useState<TokenResult>();
  const { result, isLoading, getPairInfo, fetchTokenInfo } = usePair();

  useEffect(() => {
    if (isLoading || (result.pairs.length && currentPair)) return;
    const currentP = result.pairs.find(
      (pairs: Pair) =>
        (pairs.pair[0].symbol === UST && pairs.pair[1].symbol === HALO) ||
        (pairs.pair[0].symbol === HALO && pairs.pair[1].symbol === UST)
    );
    const getCurrentPair = async () => {
      if (currentP) {
        const pairInfo = await getPairInfo(currentP.contract);
        setCurrentPair(pairInfo);

        const saleTokenAddress = saleAssetFromPair(pairInfo.asset_infos).info
          ?.token.contract_addr;

        setSaleTokenInfo(await fetchTokenInfo(saleTokenAddress));
      }
    };
    getCurrentPair();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, result.pairs.length]);

  return (
    <div className="w-128 p-10 min-h-3/4">
      <SwapHeader />
      <SwapForm
        loading={isLoading}
        pair={currentPair}
        saleTokenInfo={saleTokenInfo}
      />
    </div>
  );
}

export const SwapWrapper = (props: { inModal: true }) => {
  const { hideModal } = useSetModal();

  return (
    <div
      className={`max-w-md w-full relative ${
        props.inModal ? "rounded-md" : ""
      }`}
    >
      {props.inModal && (
        <button
          onClick={hideModal}
          className="absolute right-2 top-2 text-angel-grey hover:text-black"
        >
          <MdOutlineClose size={30} />
        </button>
      )}
      <Swap />
    </div>
  );
};

export const SwapModal = () => {
  return <SwapWrapper inModal />;
};

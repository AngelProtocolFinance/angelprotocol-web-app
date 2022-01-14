import { useState } from "react";
import { useForm } from "react-hook-form";
import { Receipt } from "components/Donater/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { receiptSchema } from "components/Donater/schema";
import { useGetter, useSetter } from "store/accessors";
import { useConnectedWallet } from "@terra-money/wallet-provider";
import maskAddress from "helpers/maskAddress";
import { useRequestReceiptMutation } from "services/apes/donations";
import { Step } from "services/transaction/types";
import { setStage } from "services/transaction/transactionSlice";

// function FormLabel({ title, htmlFor }: any) {
//   return (
//     <label
//       htmlFor={htmlFor}
//       className="text-angel-grey text-md uppercase font-semibold mb-1"
//     >
//       {title}
//     </label>
//   );
// }

type DataProps = {
  name: string;
  value: string;
};

function ReceiptDetails({ name, value }: DataProps) {
  return (
    <p className="text-lg border-b-2 border-grey-500 pb-1">
      <span className="inline-block mr-2 capitalize">{name}:</span>
      <span className="inline-block">{value}</span>
    </p>
  );
}

export default function ReceiptForm() {
  const { stage } = useGetter((state) => state.transaction);
  const dispatch = useSetter();
  const wallet = useConnectedWallet();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<Receipt>({
    reValidateMode: "onChange",
    defaultValues: {
      amount: parseInt(stage.content?.tx?.amount || ""),
      transactionDate: new Date().toISOString(),
      transactionId: stage.content?.tx?.txHash,
      chainId: wallet?.network.chainID,
      fullName: "",
      email: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      denomination: "UST",
    },
    resolver: yupResolver(receiptSchema),
  });

  const [submitting, setSubmitting] = useState(false);
  const [requestReceipt] = useRequestReceiptMutation();
  const endowment_addr = stage.content?.tx?.receiver;
  const to = stage.content?.tx?.to;

  const onSubmit = async (body: Receipt) => {
    setSubmitting(true);
    const key = to === "charity" ? "charityId" : "fundId";
    const receipt = { ...body, [key]: endowment_addr };

    const response: any = await requestReceipt({
      receipt,
      address: wallet?.walletAddress + "",
    });
    setSubmitting(false);
    if (response.data) {
      dispatch(
        setStage({
          step: Step.success,
          content: {
            url: stage.content?.url,
            message:
              response?.data?.message ||
              "Receipt request successfully sent, Your receipt will be sent to your email address",
          },
        })
      );
    } else {
      dispatch(
        setStage({
          step: Step.error,
          content: {
            message: "Error processing your receipt,",
          },
        })
      );
    }
  };

  const receiptData: DataProps[] = [
    {
      name: "Transaction date",
      value: new Date(getValues("transactionDate")).toDateString(),
    },
    {
      name: "Transaction id",
      value: maskAddress(getValues("transactionId")),
    },
    {
      name: "amount",
      value: `${getValues("amount")} UST`,
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white grid gap-4 p-4 rounded-md w-full max-w-lg"
      autoComplete="off"
      autoSave="off"
    >
      <h1 className="font-heading text-lg font-semibold text-grey-600">
        Request Receipt
      </h1>
      {receiptData.map(({ name, value }, idx) => (
        <ReceiptDetails name={name} value={value} key={idx} />
      ))}
      <div className="grid">
        <input
          {...register("email")}
          autoComplete="off"
          id="email"
          type="text"
          placeholder="Email"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <div className="grid">
        <input
          {...register("fullName")}
          autoComplete="off"
          id="fullName"
          type="text"
          placeholder="full Name"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <div className="grid">
        <textarea
          {...register("streetAddress")}
          autoComplete="off"
          id="streetAddress"
          placeholder="street Address"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <div className="grid">
        <input
          {...register("city")}
          autoComplete="off"
          id="city"
          type="text"
          placeholder="City"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <div className="grid">
        <input
          {...register("state")}
          autoComplete="off"
          id="state"
          type="text"
          placeholder="state"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <div className="grid">
        <input
          {...register("zipCode")}
          autoComplete="off"
          id="zipCode"
          type="text"
          placeholder="zip Code"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <div className="grid">
        <input
          {...register("country")}
          autoComplete="off"
          id="country"
          type="text"
          placeholder="country"
          className="p-1 pl-0 outline-none border-2  border-dark-grey border-opacity-60 text-dark-grey text-xl pl-2 rounded-xl"
        />
      </div>
      <button
        disabled={submitting || !isValid}
        className="bg-angel-orange disabled:bg-grey-accent p-1 rounded-md mt-2 uppercase text-md text-white font-bold"
        type="submit"
      >
        {submitting ? "processing..." : "submit"}
      </button>
    </form>
  );
}

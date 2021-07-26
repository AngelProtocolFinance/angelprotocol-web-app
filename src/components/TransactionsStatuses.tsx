import React from "react";

// TODO (borodanov): remove 'any', create interface for TransactionsStatuses props
export function TransactionsStatuses(props: any) {
  const { transactionsStatuses } = props;

  return (
    <div>
      {/* TODO (borodanov): remove 'any' */}
      {transactionsStatuses?.map((transactionStatus: any, i: number) => {
        {
          /* TODO (borodanov): make keys not to equal to index */
        }
        return <div key={i}>{transactionStatus}</div>;
      })}
    </div>
  );
}

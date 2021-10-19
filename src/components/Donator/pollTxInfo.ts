import { TxInfo } from "@terra-money/terra.js";

export default async function pollTxInfo(
  txGetter: (txhash: string) => Promise<Response>,
  txhash: string,
  timetoRetry: number,
  retryLimit: number
): Promise<TxInfo> {
  return await new Promise((resolve, reject) => {
    let retries = 0;
    (async function poll() {
      let id = setTimeout(async () => {
        try {
          if (retries++ >= retryLimit) {
            clearTimeout(id);
            reject(undefined);
          }
          var txres = await txGetter(txhash);
          if (txres.status === 200) {
            clearTimeout(id);
            const txInfo = txres.json();
            resolve(txInfo);
          } else if (txres.status === 404) {
            poll();
          } else {
            clearTimeout(id);
            reject(undefined);
          }
        } catch (err) {
          console.log(err);
          clearTimeout(id);
          reject(undefined);
        }
      }, timetoRetry);
    })();
  });
}

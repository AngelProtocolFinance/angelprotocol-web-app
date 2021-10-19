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
            reject(id);
          }
          var txres = await txGetter(txhash);
          if (txres.status === 200) {
            clearTimeout(id);
            const txInfo = txres.json();
            resolve(txInfo);
          } else if (txres.status === 404) {
            poll();
          } else {
            reject(id);
          }
        } catch (err) {
          console.error(err);
          reject(id);
        }
      }, timetoRetry);
    })();
  });
}

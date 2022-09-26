import { Web3Storage } from "web3.storage";

//https://docs.ipfs.tech/concepts/ipfs-gateway/#gateway-providers
export const IPFS_GATEWAY = "https://cloudflare-ipfs.com/ipfs"; //public

export async function uploadToIpfs(file: File): Promise<string> {
  const client = new Web3Storage({
    token: process.env.REACT_APP_WEB3_STORAGE_API_KEY!,
    endpoint: new URL("https://api.web3.storage"),
  });
  const cid = await client.put([file], { wrapWithDirectory: false });
  //remove all whitespace from file name
  //NOTE: AWS doesn't accept URLs with space e.g google.com/hello to the world.jpg
  return `${IPFS_GATEWAY}/${cid}`;
  //let caller handle errors
}

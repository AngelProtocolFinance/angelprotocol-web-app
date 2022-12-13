import { Web3Storage } from "web3.storage";

//https://docs.ipfs.tech/concepts/ipfs-gateway/#gateway-providers
export const IPFS_GATEWAY = "https://ipfs.io/ipfs"; //public

export async function uploadToIpfs(files: File[]): Promise<string | null> {
  if (files.length <= 0) return null;

  const client = new Web3Storage({
    token: process.env.REACT_APP_WEB3_STORAGE_API_KEY!,
    endpoint: new URL("https://api.web3.storage"),
  });

  return await client.put(files);
}

//https://docs.ipfs.tech/concepts/ipfs-gateway/#gateway-providers
export function genPublicUrl(cid: string, fileName: string) {
  // NOTE: AWS doesn't accept URLs with space e.g 'google.com/hello to the world.jpg'
  // remove all whitespace from file name
  return `${IPFS_GATEWAY}/${cid}/${encodeURIComponent(fileName)}`;
}

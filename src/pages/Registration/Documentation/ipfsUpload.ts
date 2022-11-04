import { Web3Storage } from "web3.storage";

//https://docs.ipfs.tech/concepts/ipfs-gateway/#gateway-providers
export const IPFS_GATEWAY = "https://ipfs.io/ipfs"; //public

export async function ipfsUpload(files: File[]): Promise<string[]> {
  if (files.length <= 0) return [];

  const client = new Web3Storage({
    token: process.env.REACT_APP_WEB3_STORAGE_API_KEY!,
    endpoint: new URL("https://api.web3.storage"),
  });

  const cid = await client.put(files);

  // remove all whitespace from file name
  // NOTE: AWS doesn't accept URLs with space e.g 'google.com/hello to the world.jpg'
  return files.map(({ name }) => genPublicUrl(cid, encodeURIComponent(name)));
}

//https://docs.ipfs.tech/concepts/ipfs-gateway/#gateway-providers
function genPublicUrl(cid: string, fileName: string) {
  return `${IPFS_GATEWAY}/${cid}/${fileName}`;
}

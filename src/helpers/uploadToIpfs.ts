import { Web3Storage } from "web3.storage";

//https://docs.ipfs.tech/concepts/ipfs-gateway/#gateway-providers
export const IPFS_GATEWAY = "https://ipfs.io/ipfs"; //public

export async function uploadToIpfs(file: File): Promise<string> {
  const client = new Web3Storage({
    token: process.env.REACT_APP_WEB3_STORAGE_API_KEY!,
    endpoint: new URL("https://api.web3.storage"),
  });
  const fileName = file.name.replace(/\s/g, "");
  const cid = await client.put([file], { name: fileName });
  //remove all whitespace from file name
  //NOTE: AWS doesn't accept URLs with space e.g google.com/hello to the world.jpg
  return genPublicUrl(cid, fileName);
  //let caller handle errors
}

//https://docs.ipfs.tech/concepts/ipfs-gateway/#gateway-providers
function genPublicUrl(cid: string, fileName: string) {
  return `${IPFS_GATEWAY}/${cid}/${fileName}`;
}

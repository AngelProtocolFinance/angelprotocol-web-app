import { Web3Storage } from "web3.storage";

export async function uploadToIpfs(
  uploadPath: string,
  file: File
): Promise<string> {
  const client = new Web3Storage({
    token: process.env.REACT_APP_WEB3_STORAGE_API_KEY!,
    endpoint: new URL("https://api.web3.storage"),
  });
  const cid = await client.put([file], { name: uploadPath });
  //remove all whitespace from file name
  //NOTE: AWS doesn't accept URLs with space e.g google.com/hello to the world.jpg
  return genPublicUrl(cid, file.name.replace(/\s/g, ""));
  //let caller handle errors
}
//https://docs.ipfs.tech/concepts/ipfs-gateway/#gateway-providers
export const IPFS_GATEWAY = "https://cloudflare-ipfs.com/ipfs"; //public
function genPublicUrl(cid: string, fileName: string) {
  return `${IPFS_GATEWAY}/${cid}/${fileName}`;
}

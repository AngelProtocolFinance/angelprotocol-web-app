import { Web3Storage } from "web3.storage";

async function uploadToIpfs(uploadPath: string, file: File): Promise<string> {
  const client = new Web3Storage({
    token: process.env.REACT_APP_WEB3_STORAGE_API_KEY!,
    endpoint: new URL("https://api.web3.storage"),
  });
  const cid = await client.put([file], { name: uploadPath });
  return genPublicUrl(cid, file.name);
  //let caller handle errors
}

export default uploadToIpfs;
//https://docs.ipfs.tech/concepts/ipfs-gateway/#gateway-providers
const GATEWAY = "ipfs.w3s.link"; //public
function genPublicUrl(cid: string, fileName: string) {
  return `https://${cid}.${GATEWAY}/${fileName}`;
}

import { cid, mockedUpload } from "setupTests";
import { IPFS_GATEWAY, uploadToIpfs } from "./uploadToIpfs";

const path = "pathThatDoesntMatterInResult";
const fileName = "test";
const file = new File([], fileName);

describe("uploadToIpfs tests", () => {
  it("returns correctly extracted data after successful upload", async () => {
    const result = await uploadToIpfs(path, file);
    expect(mockedUpload).toHaveBeenCalledWith([file], { name: path });
    expect(result).toStrictEqual(`https://${cid}.${IPFS_GATEWAY}/${file.name}`);
  });
});

import { cid, mockedUpload } from "setupTests";
import { IPFS_GATEWAY, uploadToIpfs } from "./uploadToIpfs";

const path = "pathThatDoesntMatterInResult";

describe("uploadToIpfs tests", () => {
  it("returns correctly extracted data after successful upload", async () => {
    const fileName = "test";
    const file = new File([], fileName);

    const result = await uploadToIpfs(path, file);
    expect(mockedUpload).toHaveBeenCalledWith([file], { name: path });
    expect(result).toEqual(`${IPFS_GATEWAY}/${cid}/${fileName}`);
  });
  it("whitespace is removed from file name in url", async () => {
    const file2 = new File([], " hello to the world.jpg ");

    const result = await uploadToIpfs(path, file2);
    expect(mockedUpload).toHaveBeenCalledWith([file2], { name: path });
    expect(result).toEqual(`${IPFS_GATEWAY}/${cid}/hellototheworld.jpg`);
  });
});

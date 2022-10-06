import { cid, mockedUpload } from "setupTests";
import { IPFS_GATEWAY, uploadToIpfs } from "../uploadToIpfs";

describe("uploadToIpfs tests", () => {
  it("returns correctly extracted data after successful upload", async () => {
    const fileName = "test";
    const file = new File([], fileName);

    const result = await uploadToIpfs(file);
    expect(mockedUpload).toHaveBeenCalledWith([file], { name: fileName });
    expect(result).toEqual(`${IPFS_GATEWAY}/${cid}/${fileName}`);
  });

  it("returns file with file name encoded", async () => {
    const file = new File([], "test with space");

    const result = await uploadToIpfs(file);
    expect(mockedUpload).toHaveBeenCalledWith([file], {
      name: "test%20with%20space",
    });
    expect(result).toEqual(`${IPFS_GATEWAY}/${cid}/test%20with%20space`);
  });
});

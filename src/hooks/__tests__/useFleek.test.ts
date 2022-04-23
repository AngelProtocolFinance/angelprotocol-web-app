import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useFleek from "hooks/useFleek";

describe("useFleek Test", () => {
  it("should render correctly", async () => {
    const { result } = renderHook(() => useFleek());
    expect(result.current.isUploading).toBe(false);
    expect(result.current.upload).toBeDefined();
    expect(typeof result.current.upload).toBe("function");
  });

  it("uploads a file and returns ipfs url", async () => {
    jest.setTimeout(30000);
    const { result } = renderHook(() => useFleek());
    let uploaded: string | undefined;

    await act(async () => {
      uploaded = await result.current.upload("file", "string data");
    });

    expect(typeof uploaded).toBe("string");
    const isFleekUrl = uploaded?.startsWith("https://storageapi.fleek.co");
    expect(isFleekUrl).toBe(true);
  });
});

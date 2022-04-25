import { renderHook } from "@testing-library/react-hooks";
import useFleek from "hooks/useFleek";

jest.useFakeTimers("legacy");
describe("useFleek Test", () => {
  it("should initialize correctly", async () => {
    const { result } = renderHook(() => useFleek());
    expect(result.current.isUploading).toBe(false);
    expect(result.current.upload).toBeDefined();
    expect(typeof result.current.upload).toBe("function");
  });
});

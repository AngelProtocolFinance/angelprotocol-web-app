import { render } from "@testing-library/react";
import CsvExporter from "../CsvExporter";

const mockChildComponent = jest.fn();
jest.mock("react-csv", () => ({
  __esModule: true,
  CSVLink: (props: any) => {
    mockChildComponent(props);
    return <div>mock</div>;
  },
}));

describe("CsvExporter tests", () => {
  it("downloads the file with provided name", async () => {
    const headers = [
      { key: "key1", label: "Key1" },
      { key: "key2", label: "Key2" },
    ];
    const data = [
      { key1: "value11", key2: "value12" },
      { key1: "value21", key2: "value22" },
    ];
    const filename = "testfile.csv";
    render(<CsvExporter data={data} headers={headers} filename={filename} />);
    expect(mockChildComponent).toHaveBeenCalledWith(
      expect.objectContaining({ data, filename, headers })
    );
  });
});

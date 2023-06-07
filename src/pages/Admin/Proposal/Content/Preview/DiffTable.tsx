import { Diff, PrimitiveValue } from "types/utils";
import Image from "components/Image";
import TableSection, { Cells } from "components/TableSection";
import { bucketURL } from "helpers/uploadFiles";
import PreviewContainer from "./common/PreviewContainer";

export default function DiffTable(props: { diffs: Diff[] }) {
  return (
    <PreviewContainer>
      <table>
        <TableSection type="thead" rowClass="">
          <Cells
            type="th"
            cellClass="text-right p-2 uppercase text-xs font-heading border-r border-prim"
            dual
          >
            <></>
            <>from</>
            <>to</>
          </Cells>
        </TableSection>
        <TableSection type="tbody" rowClass="border-b border-prim">
          {props.diffs.map(([key, prev, next]) => (
            <Cells
              type="td"
              cellClass="text-right p-2 border-r border-prim break-all max-w-2xl"
              dual
              key={key as string} //T is a normal object with string keys
              verticalHeaderClass="text-xs text-left p-2 pl-0 font-normal border-r border-prim max-w-2xl break-all"
            >
              <>{(key as string).replace(/_/g, " ")}</>
              {createColumn(prev)}
              {createColumn(next)}
            </Cells>
          ))}
        </TableSection>
      </table>
    </PreviewContainer>
  );
}

function createColumn(value: PrimitiveValue): JSX.Element {
  // if the string value starts with the IPFS gateway URL value, this is surely a file
  // the user has uploaded and a preview should be displayed
  if (typeof value === "string" && value.startsWith(bucketURL)) {
    return (
      <Image
        src={value}
        className="w-40 lg:w-[40rem] lg:min-h-[5rem] max-w-2xl"
        onError={(e) =>
          e.currentTarget.setAttribute("src", "/images/home-banner.jpg")
        }
      />
    );
  }

  return <>{value}</>;
}

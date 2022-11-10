import { DiffSet } from "types/utils";
import ImageWrapper from "components/ImageWrapper";
import TableSection, { Cells } from "components/TableSection";
import { IPFS_GATEWAY } from "helpers";
import PreviewContainer from "./common/PreviewContainer";

export default function DiffTable<T extends object>(props: {
  diffSet: DiffSet<T>;
}) {
  return (
    <PreviewContainer>
      <table>
        <TableSection type="thead" rowClass="">
          <Cells
            type="th"
            cellClass="text-right p-2 uppercase text-xs font-heading border-r border-white/20"
            dual
          >
            <></>
            <>from</>
            <>to</>
          </Cells>
        </TableSection>
        <TableSection type="tbody" rowClass="border-b border-white/20">
          {props.diffSet.map(([key, prev, next]) => (
            <Cells
              type="td"
              cellClass="text-right p-2 border-r border-white/20 truncate max-w-2xl"
              dual
              key={key as string} //T is a normal object with string keys
              verticalHeaderClass="uppercase text-xs text-left p-2 pl-0 font-heading border-r border-white/20"
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

function createColumn<T extends object>(value: T[keyof T]): JSX.Element {
  // value == null -> value is either null or undefined
  // https://contribute.jquery.org/style-guide/js/#equality
  if (value == null) {
    return <>not set</>;
  }

  // if the string value starts with the IPFS gateway URL value, this is surely a file
  // the user has uploaded and a preview should be displayed
  if (typeof value === "string" && value.startsWith(IPFS_GATEWAY)) {
    return (
      <ImageWrapper
        src={value}
        alt=""
        className="w-40 lg:w-[40rem] lg:min-h-[5rem] max-w-2xl object-contain"
      />
    );
  }

  if (typeof value === "object") {
    return (
      <div className="grid bg-white/10 shadow-inner rounded-md p-2 text-sm">
        <code className="font-mono whitespace-pre overflow-x-auto text-left">
          {JSON.stringify(value, null, 2)}
        </code>
      </div>
    );
  }

  return <>{JSON.stringify(value)}</>;
}

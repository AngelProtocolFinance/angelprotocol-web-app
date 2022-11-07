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
  if (typeof value === "string" && value.startsWith(IPFS_GATEWAY)) {
    return (
      <ImageWrapper
        src={value}
        alt=""
        className="w-40 sm:w-[40rem] max-w-2xl object-contain"
      />
    );
  }

  return <>{value ?? "not set"}</>;
}

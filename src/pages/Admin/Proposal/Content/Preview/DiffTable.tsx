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
            cellClass="text-right p-2 uppercase text-xs font-heading border-r border-gray-l2 dark:border-bluegray"
            dual
          >
            <></>
            <>from</>
            <>to</>
          </Cells>
        </TableSection>
        <TableSection
          type="tbody"
          rowClass="border-b border-gray-l2 dark:border-bluegray"
        >
          {props.diffSet.map(([key, prev, next]) => (
            <Cells
              type="td"
              cellClass="text-right p-2 border-r border-gray-l2 dark:border-bluegray truncate max-w-2xl"
              dual
              key={key as string} //T is a normal object with string keys
              verticalHeaderClass="uppercase text-xs text-left p-2 pl-0 font-heading border-r border-gray-l2 dark:border-bluegray"
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
  if (!value) {
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

  return <>{value}</>;
}

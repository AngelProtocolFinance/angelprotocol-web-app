import { useLoaderData, useSearchParams } from "@remix-run/react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import type { LoaderData } from "./api";
import { TABLE_COLUMNS } from "./constants";
import { EditableCell } from "./editable-cell";
import { TablePagination } from "./table-pagination";
import type { CellInfo, Nonprofit, SortInfo } from "./types";
export { loader, action } from "./api";

function NonprofitOutreach() {
  const { nonprofits, totalPages, currentPage } =
    useLoaderData() as unknown as LoaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const baseColumns: ColumnDef<Nonprofit>[] = TABLE_COLUMNS.map((key) => ({
    accessorKey: key,
    header: key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    cell: (info: CellInfo) => (
      <EditableCell
        value={info.getValue()}
        row={info.row}
        column={info.column}
        isEditing={editingId === info.row.original._id?.toString()}
      />
    ),
  }));

  const actionColumn: ColumnDef<Nonprofit> = {
    id: "actions",
    cell: (info: CellInfo) => {
      const row = info.row.original;
      const isEditing = editingId === row._id?.toString();

      if (isEditing) {
        return (
          <form method="post" className="flex gap-2">
            <input type="hidden" name="id" value={row._id?.toString()} />
            <input type="hidden" name="action" value="update" />
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-blue-d1 hover:bg-blue-d2 text-white rounded transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="px-3 py-1 text-sm bg-gray hover:bg-gray-d1 text-white rounded transition-colors"
            >
              Cancel
            </button>
          </form>
        );
      }

      return (
        <button
          onClick={() => setEditingId(row._id?.toString() ?? "")}
          className="px-3 py-1 text-sm bg-blue-l4 hover:bg-blue-l3 text-blue-d2 rounded transition-colors"
        >
          Edit
        </button>
      );
    },
  };

  const columns = [...baseColumns, actionColumn];

  const table = useReactTable({
    data: nonprofits,
    columns,
    state: { sorting },
    onSortingChange: (newSorting) => {
      const sortingState = (
        typeof newSorting === "function" ? newSorting(sorting) : newSorting
      ) as SortingState;

      setSorting(sortingState);

      if (sortingState.length > 0) {
        const sortInfo = sortingState[0] as SortInfo;
        setSearchParams({
          ...Object.fromEntries(searchParams),
          sortField: sortInfo.id,
          sortOrder: sortInfo.desc ? "desc" : "asc",
        });
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-6 font-body">
      <h1 className="text-2xl font-heading font-bold mb-6 text-gray-d4">
        Nonprofit Outreach
      </h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-l3">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-l5">
                {table.getHeaderGroups().map((headerGroup) =>
                  headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-sm font-medium text-gray-d3 border-b border-gray-l3"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() && (
                          <span className="text-blue-d1">
                            {header.column.getIsSorted() === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-l5 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 border-b border-gray-l3"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setSearchParams({
            ...Object.fromEntries(searchParams),
            page: page.toString(),
          });
        }}
      />
    </div>
  );
}

export default NonprofitOutreach;

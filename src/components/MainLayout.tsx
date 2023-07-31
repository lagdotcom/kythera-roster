import "./MainLayout.css";

import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "preact/hooks";

import PC from "../PC";
import SortableTableHeading from "./SortableTableHeading";

interface Props {
  data: PC[];
}

const columnHelper = createColumnHelper<PC>();
const columns = [
  columnHelper.accessor("status", { header: "Status" }),
  columnHelper.accessor("id", { header: "ID" }),
  columnHelper.accessor("player", { header: "Player" }),
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("totalLevel", { header: "Level" }),
  columnHelper.accessor("niceRace", { header: "Race" }),
  columnHelper.accessor("niceClassList", { header: "Class" }),
];

export default function MainLayout({ data }: Props) {
  const [globalFilter, setGlobalFilter] = useState("");

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: "status", value: "alive" },
  ]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "name", desc: false },
  ]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      columnVisibility: { status: false },
      globalFilter,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <table className="main">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) =>
              header.column.getCanSort() ? (
                <SortableTableHeading key={header.id} header={header} />
              ) : (
                <th key={header.id} colSpan={header.colSpan}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              )
            )}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, index) => (
          <tr key={index}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

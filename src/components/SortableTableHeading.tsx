import "./SortableTableHeading.css";

import { flexRender, Header } from "@tanstack/react-table";

import PC from "../PC";

interface Props {
  header: Header<PC, unknown>;
}

export default function SortableTableHeading({ header }: Props) {
  return (
    <th
      className="sortable"
      colSpan={header.colSpan}
      onClick={header.column.getToggleSortingHandler()}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      {{ asc: " 🔼", desc: " 🔽" }[header.column.getIsSorted() as string] ??
        null}
    </th>
  );
}

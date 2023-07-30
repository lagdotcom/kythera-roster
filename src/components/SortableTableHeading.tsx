import "./SortableTableHeading.css";

import { ComponentChildren } from "preact";

import { TableSorts } from "../hooks/useTable";
import PC from "../PC";
import classnames from "../tools/classnames";

interface Props {
  children: ComponentChildren;
  field: keyof PC;
  setSortField: (field: keyof PC) => void;
  sorts: TableSorts<PC>;
}

export default function SortableTableHeading({
  children,
  field,
  setSortField,
  sorts,
}: Props) {
  const onClick = () => setSortField(field);
  const sorting = sorts.find((s) => s.field === field);

  return (
    <th
      className={classnames("sortable", {
        ascending: sorting?.descending === false,
        descending: sorting?.descending === true,
      })}
      onClick={onClick}
    >
      {children}
    </th>
  );
}

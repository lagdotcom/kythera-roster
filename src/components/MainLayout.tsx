import "./MainLayout.css";

import useTable from "../hooks/useTable";
import PC from "../PC";
import SortableTableHeading from "./SortableTableHeading";

interface Props {
  data: PC[];
}

export default function MainLayout({ data }: Props) {
  const { rows, setSortField, sorts } = useTable(data, {
    fields: { id: { type: "number" }, totalLevel: { type: "number" } },
    defaultFilters: [{ field: "status", eq: "alive" }],
    defaultSorts: [{ field: "name", descending: false }],
  });

  const heading = (field: keyof PC, label: string) => (
    <SortableTableHeading
      field={field}
      setSortField={setSortField}
      sorts={sorts}
    >
      {label}
    </SortableTableHeading>
  );

  return (
    <table className="main">
      <thead>
        <tr>
          {heading("id", "ID")}
          {heading("player", "Player")}
          {heading("name", "Name")}
          {heading("totalLevel", "Level")}
          {heading("niceRace", "Race")}
          {heading("niceClassList", "Class")}
        </tr>
      </thead>
      <tbody>
        {rows.map((pc, index) => (
          <tr key={index}>
            <td>{pc.id}</td>
            <td>{pc.player}</td>
            <td>{pc.name}</td>
            <td>{pc.totalLevel}</td>
            <td>{pc.niceRace}</td>
            <td>{pc.niceClassList}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

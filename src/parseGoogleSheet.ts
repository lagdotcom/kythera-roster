import PC from "./PC";
import {
  CraftingProficiencies,
  PCData,
  PCStatus,
  ProficiencyStatus,
} from "./types";

const GoogleSheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCSqDKYCTkrfnoigW_0QoMMlUkf8r2DOCTYgdNyXvP1__5Vq8tKv2xVS-qmW7AWgJOoC4M_-OSfBFD/pub?gid=0&single=true&output=tsv";

function* getRows(source: string, ignoreRows: number) {
  for (const line of source.split("\n")) {
    const cols = line.split("\t");
    if (ignoreRows-- <= 0) yield cols;
  }
}

type ConversionEntry<K extends keyof PCData, T = PCData[K]> = {
  field: K;
  col: number;
  converter?: (raw: string) => T;
};

const convertColumn = <K extends keyof PCData>(
  col: number,
  field: K,
  converter?: (raw: string) => PCData[K]
): ConversionEntry<K> => ({
  col,
  field,
  converter,
});

const asPCStatus = (raw: string): PCStatus => {
  if (raw === "💀") return "dead";
  if (raw === "🏃‍♀️") return "hiatus";
  if (raw === "😴") return "retired";
  return "alive";
};

const asStr = (raw: string) => raw.trim();
const asInt = (raw: string) => parseInt(raw, 10);

const asMaybeStr = (raw: string) => (raw ? asStr(raw) : undefined);
const asMaybeInt = (raw: string) => (raw ? asInt(raw) : undefined);

const asProficiency = (raw: string): ProficiencyStatus | undefined => {
  if (raw === "Y") return "yes";
  if (raw === "wip") return "wip";
};

const dataConversion = (function () {
  const cols: ConversionEntry<keyof PCData>[] = [
    convertColumn(3, "name"),
    convertColumn(2, "player"),

    convertColumn(0, "status", asPCStatus),
    convertColumn(1, "id", asInt),
    convertColumn(4, "fullName"),
    convertColumn(5, "race"),
    convertColumn(6, "subrace", asMaybeStr),

    convertColumn(9, "class1"),
    convertColumn(10, "subclass1", asMaybeStr),
    convertColumn(12, "level1", asInt),
    convertColumn(13, "class2", asMaybeStr),
    convertColumn(14, "subclass2", asMaybeStr),
    convertColumn(16, "level2", asMaybeInt),
    convertColumn(17, "class3", asMaybeStr),
    convertColumn(18, "subclass3", asMaybeStr),
    convertColumn(20, "level3", asMaybeInt),

    convertColumn(21, "guild1", asMaybeStr),
    convertColumn(22, "guild2", asMaybeStr),
    convertColumn(23, "firstSession", asMaybeStr),
    convertColumn(24, "latestSession", asMaybeStr),
  ];

  let index = 25;
  for (const prof of CraftingProficiencies)
    cols.push(convertColumn(index++, `prof${prof}` as const, asProficiency));

  return cols;
})();

export async function getRosterSheet() {
  const raw = await fetch(GoogleSheetURL).then((r) => r.text());
  const data: PC[] = [];

  for (const row of getRows(raw, 2)) {
    const pc: Partial<PCData> = {};

    for (const entry of dataConversion) {
      const cell = row[entry.col];
      pc[entry.field] = entry.converter ? entry.converter(cell) : cell;
    }

    data.push(new PC(pc as PCData));
  }

  return data;
}

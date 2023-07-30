import { useMemo, useState } from "preact/hooks";

import { KeysMatching } from "../magic";

type Predicate<T> = (value: T) => boolean;
type TableFilter<T> = { field: keyof T; eq?: any };
export type TableFilters<T> = TableFilter<T>[];

type Comparator<T> = (a: T, b: T) => number;
type TableSort<T> = { field: keyof T; descending: boolean };
export type TableSorts<T> = TableSort<T>[];

type FieldConfig = { type: "number" | "string" };

type TableFieldsConfig<T> = Partial<Record<keyof T, FieldConfig>>;

type TableConfig<T> = {
  defaultFilters?: TableFilters<T>;
  defaultSorts?: TableSorts<T>;
  fields: TableFieldsConfig<T>;
};

const DefaultFieldConfig: FieldConfig = { type: "string" };

function makeFilterFn<T>(filters: TableFilters<T>, config: TableConfig<T>) {
  const matchers: Predicate<T>[] = [];

  for (const entry of filters) {
    if (entry.eq) matchers.push((pc) => pc[entry.field] === entry.eq);
  }

  return (e: T) => matchers.every((fn) => fn(e));
}

type NumFields<T> = KeysMatching<T, "number">;
type StrFields<T> = KeysMatching<T, "string">;

const makeComparator = {
  number: <T, K extends NumFields<T>>(
    field: K,
    descending?: boolean
  ): Comparator<T> => {
    if (descending) return (a, b) => b[field] - a[field];
    return (a, b) => a[field] - b[field];
  },
  string: <T, K extends StrFields<T>>(
    field: K,
    descending?: boolean
  ): Comparator<T> => {
    if (descending) return (a, b) => b[field].localeCompare(a[field]);
    return (a, b) => a[field].localeCompare(b[field]);
  },
};

function makeSortFn<T>(sorts: TableSorts<T>, config: TableConfig<T>) {
  const comparators: Comparator<T>[] = [];

  for (const sort of sorts) {
    const fieldConfig = config.fields[sort.field] ?? DefaultFieldConfig;

    comparators.push(
      makeComparator[fieldConfig.type](sort.field, sort.descending)
    );
  }

  return (a: T, b: T) => {
    for (const cmp of comparators) {
      const result = cmp(a, b);
      if (result) return result;
    }

    return 0;
  };
}

export default function useTable<T>(data: T[], config: TableConfig<T>) {
  const [filters, setFilters] = useState<TableFilters<T>>(
    config.defaultFilters ?? []
  );
  const [sorts, setSorts] = useState<TableSorts<T>>(config.defaultSorts ?? []);

  const setSortField = (field: keyof T) => {
    if (sorts.length === 1 && sorts[0].field === field) {
      // just flip the direction instead
      return setSorts([{ field, descending: !sorts[0].descending }]);
    }

    setSorts([{ field, descending: false }]);
  };

  const filter = useMemo(
    () => makeFilterFn(filters, config),
    [config, filters]
  );

  const sort = useMemo(() => makeSortFn(sorts, config), [config, sorts]);

  const filteredData = useMemo(() => data.filter(filter), [data, filter]);
  const rows = useMemo(() => filteredData.sort(sort), [filteredData, sort]);

  return { filters, sorts, rows, setSortField };
}

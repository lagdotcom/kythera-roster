"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // globalExternal:preact
  var require_preact = __commonJS({
    "globalExternal:preact"(exports, module) {
      module.exports = globalThis.preact;
    }
  });

  // globalExternal:preact/hooks
  var require_hooks = __commonJS({
    "globalExternal:preact/hooks"(exports, module) {
      module.exports = globalThis.preactHooks;
    }
  });

  // globalExternal:@tanstack/react-table
  var require_react_table = __commonJS({
    "globalExternal:@tanstack/react-table"(exports, module) {
      module.exports = globalThis.ReactTable;
    }
  });

  // src/index.tsx
  var import_preact3 = __toESM(require_preact());

  // src/components/App.tsx
  var import_hooks2 = __toESM(require_hooks());

  // src/PC.ts
  var PC = class {
    constructor(data) {
      Object.assign(this, data);
    }
    get totalLevel() {
      var _a, _b;
      return this.level1 + ((_a = this.level2) != null ? _a : 0) + ((_b = this.level3) != null ? _b : 0);
    }
    get classList() {
      const {
        class1,
        subclass1,
        level1,
        class2,
        subclass2,
        level2,
        class3,
        subclass3,
        level3
      } = this;
      const entries = [
        { class: class1, subclass: subclass1, level: level1 }
      ];
      if (class2 && level2)
        entries.push({ class: class2, subclass: subclass2, level: level2 });
      if (class3 && level3)
        entries.push({ class: class3, subclass: subclass3, level: level3 });
      return entries;
    }
    get niceClassList() {
      return this.classList.map(
        (e) => e.subclass ? `${e.class} (${e.subclass}) ${e.level}` : `${e.class} ${e.level}`
      ).join(" / ");
    }
    get niceRace() {
      if (this.subrace)
        return `${this.race} (${this.subrace})`;
      return this.race;
    }
  };

  // src/types.ts
  var CraftingProficiencies = [
    "Alchemist",
    "Brewer",
    "Calligrapher",
    "Carpenter",
    "Cartographer",
    "Cobbler",
    "Cook",
    "Glassblower",
    "Herbalist",
    "Jeweller",
    "Leatherworker",
    "Mason",
    "Painter",
    "Poisoner",
    "Potter",
    "Smith",
    "Tinker",
    "Weaver",
    "Woodcarver"
  ];

  // src/parseGoogleSheet.ts
  var GoogleSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTCSqDKYCTkrfnoigW_0QoMMlUkf8r2DOCTYgdNyXvP1__5Vq8tKv2xVS-qmW7AWgJOoC4M_-OSfBFD/pub?gid=0&single=true&output=tsv";
  function* getRows(source, ignoreRows) {
    for (const line of source.split("\n")) {
      const cols = line.split("	");
      if (ignoreRows-- <= 0)
        yield cols;
    }
  }
  var convertColumn = (col, field, converter) => ({
    col,
    field,
    converter
  });
  var asPCStatus = (raw) => {
    if (raw === "\u{1F480}")
      return "dead";
    if (raw === "\u{1F3C3}\u200D\u2640\uFE0F")
      return "hiatus";
    if (raw === "\u{1F634}")
      return "retired";
    return "alive";
  };
  var asStr = (raw) => raw.trim();
  var asInt = (raw) => parseInt(raw, 10);
  var asMaybeStr = (raw) => raw ? asStr(raw) : void 0;
  var asMaybeInt = (raw) => raw ? asInt(raw) : void 0;
  var asProficiency = (raw) => {
    if (raw === "Y")
      return "yes";
    if (raw === "wip")
      return "wip";
  };
  var dataConversion = function() {
    const cols = [
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
      convertColumn(24, "latestSession", asMaybeStr)
    ];
    let index = 25;
    for (const prof of CraftingProficiencies)
      cols.push(convertColumn(index++, `prof${prof}`, asProficiency));
    return cols;
  }();
  function getRosterSheet() {
    return __async(this, null, function* () {
      const raw = yield fetch(GoogleSheetURL).then((r2) => r2.text());
      const data = [];
      for (const row of getRows(raw, 2)) {
        const pc = {};
        for (const entry of dataConversion) {
          const cell = row[entry.col];
          pc[entry.field] = entry.converter ? entry.converter(cell) : cell;
        }
        data.push(new PC(pc));
      }
      return data;
    });
  }

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var import_preact = __toESM(require_preact());
  var import_preact2 = __toESM(require_preact());
  var _ = 0;
  function o(o2, e, n, t, f, l) {
    var s, u, a = {};
    for (u in e)
      "ref" == u ? s = e[u] : a[u] = e[u];
    var i = { type: o2, props: a, key: n, ref: s, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_, __source: f, __self: l };
    if ("function" == typeof o2 && (s = o2.defaultProps))
      for (u in s)
        void 0 === a[u] && (a[u] = s[u]);
    return import_preact.options.vnode && import_preact.options.vnode(i), i;
  }

  // src/components/Loader.tsx
  function Loader() {
    return /* @__PURE__ */ o("div", { className: "loader", children: "Loading..." });
  }

  // src/components/MainLayout.tsx
  var import_react_table2 = __toESM(require_react_table());
  var import_hooks = __toESM(require_hooks());

  // src/components/SortableTableHeading.tsx
  var import_react_table = __toESM(require_react_table());
  function SortableTableHeading({ header }) {
    var _a;
    return /* @__PURE__ */ o(
      "th",
      {
        className: "sortable",
        colSpan: header.colSpan,
        onClick: header.column.getToggleSortingHandler(),
        children: [
          (0, import_react_table.flexRender)(header.column.columnDef.header, header.getContext()),
          (_a = { asc: " \u{1F53C}", desc: " \u{1F53D}" }[header.column.getIsSorted()]) != null ? _a : null
        ]
      }
    );
  }

  // src/components/MainLayout.tsx
  var columnHelper = (0, import_react_table2.createColumnHelper)();
  var columns = [
    columnHelper.accessor("status", { header: "Status" }),
    columnHelper.accessor("id", { header: "ID" }),
    columnHelper.accessor("player", { header: "Player" }),
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("totalLevel", { header: "Level" }),
    columnHelper.accessor("niceRace", { header: "Race" }),
    columnHelper.accessor("niceClassList", { header: "Class" })
  ];
  function MainLayout({ data }) {
    const [globalFilter, setGlobalFilter] = (0, import_hooks.useState)("");
    const [columnFilters, setColumnFilters] = (0, import_hooks.useState)([
      { id: "status", value: "alive" }
    ]);
    const [sorting, setSorting] = (0, import_hooks.useState)([
      { id: "name", desc: false }
    ]);
    const table = (0, import_react_table2.useReactTable)({
      data,
      columns,
      state: {
        columnFilters,
        columnVisibility: { status: false },
        globalFilter,
        sorting
      },
      getCoreRowModel: (0, import_react_table2.getCoreRowModel)(),
      getFilteredRowModel: (0, import_react_table2.getFilteredRowModel)(),
      getSortedRowModel: (0, import_react_table2.getSortedRowModel)(),
      onSortingChange: setSorting
    });
    return /* @__PURE__ */ o("table", { className: "main", children: [
      /* @__PURE__ */ o("thead", { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ o("tr", { children: headerGroup.headers.map(
        (header) => header.column.getCanSort() ? /* @__PURE__ */ o(SortableTableHeading, { header }, header.id) : /* @__PURE__ */ o("th", { colSpan: header.colSpan, children: (0, import_react_table2.flexRender)(
          header.column.columnDef.header,
          header.getContext()
        ) }, header.id)
      ) }, headerGroup.id)) }),
      /* @__PURE__ */ o("tbody", { children: table.getRowModel().rows.map((row, index) => /* @__PURE__ */ o("tr", { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ o("td", { children: (0, import_react_table2.flexRender)(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, index)) })
    ] });
  }

  // src/components/App.tsx
  function App() {
    const [element, setElement] = (0, import_hooks2.useState)(/* @__PURE__ */ o(Loader, {}));
    (0, import_hooks2.useEffect)(() => {
      getRosterSheet().then((data) => setElement(/* @__PURE__ */ o(MainLayout, { data })));
    }, []);
    return element;
  }

  // src/index.tsx
  (0, import_preact3.render)(/* @__PURE__ */ o(App, {}), document.body);
})();

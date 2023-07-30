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

  // src/hooks/useTable.ts
  var import_hooks = __toESM(require_hooks());
  var DefaultFieldConfig = { type: "string" };
  function makeFilterFn(filters, config) {
    const matchers = [];
    for (const entry of filters) {
      if (entry.eq)
        matchers.push((pc) => pc[entry.field] === entry.eq);
    }
    return (e) => matchers.every((fn) => fn(e));
  }
  var makeComparator = {
    number: (field, descending) => {
      if (descending)
        return (a, b) => b[field] - a[field];
      return (a, b) => a[field] - b[field];
    },
    string: (field, descending) => {
      if (descending)
        return (a, b) => b[field].localeCompare(a[field]);
      return (a, b) => a[field].localeCompare(b[field]);
    }
  };
  function makeSortFn(sorts, config) {
    var _a;
    const comparators = [];
    for (const sort of sorts) {
      const fieldConfig = (_a = config.fields[sort.field]) != null ? _a : DefaultFieldConfig;
      comparators.push(
        makeComparator[fieldConfig.type](sort.field, sort.descending)
      );
    }
    return (a, b) => {
      for (const cmp of comparators) {
        const result = cmp(a, b);
        if (result)
          return result;
      }
      return 0;
    };
  }
  function useTable(data, config) {
    var _a, _b;
    const [filters, setFilters] = (0, import_hooks.useState)(
      (_a = config.defaultFilters) != null ? _a : []
    );
    const [sorts, setSorts] = (0, import_hooks.useState)((_b = config.defaultSorts) != null ? _b : []);
    const setSortField = (field) => {
      if (sorts.length === 1 && sorts[0].field === field) {
        return setSorts([{ field, descending: !sorts[0].descending }]);
      }
      setSorts([{ field, descending: false }]);
    };
    const filter = (0, import_hooks.useMemo)(
      () => makeFilterFn(filters, config),
      [config, filters]
    );
    const sort = (0, import_hooks.useMemo)(() => makeSortFn(sorts, config), [config, sorts]);
    const filteredData = (0, import_hooks.useMemo)(() => data.filter(filter), [data, filter]);
    const rows = (0, import_hooks.useMemo)(() => filteredData.sort(sort), [filteredData, sort]);
    return { filters, sorts, rows, setSortField };
  }

  // src/tools/classnames.ts
  function classnames(...entries) {
    const classnames2 = [];
    for (const e of entries) {
      if (typeof e === "undefined")
        continue;
      if (typeof e === "string")
        classnames2.push(e);
      else {
        for (const k in e) {
          if (e[k])
            entries.push(k);
        }
      }
    }
    return classnames2.join(" ");
  }

  // src/components/SortableTableHeading.tsx
  function SortableTableHeading({
    children,
    field,
    setSortField,
    sorts
  }) {
    const onClick = () => setSortField(field);
    const sorting = sorts.find((s) => s.field === field);
    return /* @__PURE__ */ o(
      "th",
      {
        className: classnames("sortable", {
          ascending: (sorting == null ? void 0 : sorting.descending) === false,
          descending: (sorting == null ? void 0 : sorting.descending) === true
        }),
        onClick,
        children
      }
    );
  }

  // src/components/MainLayout.tsx
  function MainLayout({ data }) {
    const { rows, setSortField, sorts } = useTable(data, {
      fields: { id: { type: "number" }, totalLevel: { type: "number" } },
      defaultFilters: [{ field: "status", eq: "alive" }],
      defaultSorts: [{ field: "name", descending: false }]
    });
    const heading = (field, label) => /* @__PURE__ */ o(
      SortableTableHeading,
      {
        field,
        setSortField,
        sorts,
        children: label
      }
    );
    return /* @__PURE__ */ o("table", { className: "main", children: [
      /* @__PURE__ */ o("thead", { children: /* @__PURE__ */ o("tr", { children: [
        heading("id", "ID"),
        heading("player", "Player"),
        heading("name", "Name"),
        heading("totalLevel", "Level"),
        heading("niceRace", "Race"),
        heading("niceClassList", "Class")
      ] }) }),
      /* @__PURE__ */ o("tbody", { children: rows.map((pc, index) => /* @__PURE__ */ o("tr", { children: [
        /* @__PURE__ */ o("td", { children: pc.id }),
        /* @__PURE__ */ o("td", { children: pc.player }),
        /* @__PURE__ */ o("td", { children: pc.name }),
        /* @__PURE__ */ o("td", { children: pc.totalLevel }),
        /* @__PURE__ */ o("td", { children: pc.niceRace }),
        /* @__PURE__ */ o("td", { children: pc.niceClassList })
      ] }, index)) })
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

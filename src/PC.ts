import { PCData, PCStatus, ProficiencyStatus } from "./types";

type ClassEntry = { class: string; subclass?: string; level: number };

export default class PC implements PCData {
  name!: string;
  status!: PCStatus;
  id!: number;
  player!: string;
  fullName!: string;
  race!: string;
  subrace?: string;
  class1!: string;
  subclass1?: string;
  level1!: number;
  class2?: string;
  subclass2?: string;
  level2?: number;
  class3?: string;
  subclass3?: string;
  level3?: number;
  guild1?: string;
  guild2?: string;
  firstSession?: string;
  latestSession?: string;
  profAlchemy?: ProficiencyStatus;
  profBrewing?: ProficiencyStatus;
  profCalligraphy?: ProficiencyStatus;
  profCarpenter?: ProficiencyStatus;
  profCartographer?: ProficiencyStatus;
  profCobbler?: ProficiencyStatus;
  profCook?: ProficiencyStatus;
  profGlassblower?: ProficiencyStatus;
  profHerbalism?: ProficiencyStatus;
  profJeweller?: ProficiencyStatus;
  profLeatherworker?: ProficiencyStatus;
  profMason?: ProficiencyStatus;
  profPainter?: ProficiencyStatus;
  profPoisoner?: ProficiencyStatus;
  profPotter?: ProficiencyStatus;
  profSmith?: ProficiencyStatus;
  profTinker?: ProficiencyStatus;
  profWeaver?: ProficiencyStatus;
  profWoodcarver?: ProficiencyStatus;

  constructor(data: PCData) {
    Object.assign(this, data);
  }

  get totalLevel() {
    return this.level1 + (this.level2 ?? 0) + (this.level3 ?? 0);
  }

  get classList(): ClassEntry[] {
    const {
      class1,
      subclass1,
      level1,
      class2,
      subclass2,
      level2,
      class3,
      subclass3,
      level3,
    } = this;

    const entries: ClassEntry[] = [
      { class: class1, subclass: subclass1, level: level1 },
    ];

    if (class2 && level2)
      entries.push({ class: class2, subclass: subclass2, level: level2 });
    if (class3 && level3)
      entries.push({ class: class3, subclass: subclass3, level: level3 });

    return entries;
  }

  get niceClassList() {
    return this.classList
      .map((e) =>
        e.subclass
          ? `${e.class} (${e.subclass}) ${e.level}`
          : `${e.class} ${e.level}`
      )
      .join(" / ");
  }

  get niceRace() {
    if (this.subrace) return `${this.race} (${this.subrace})`;
    return this.race;
  }
}

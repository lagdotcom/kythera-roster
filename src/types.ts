export const PCStatuses = ["alive", "dead", "hiatus", "retired"] as const;
export type PCStatus = (typeof PCStatuses)[number];

export const CraftingProficiencies = [
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
  "Woodcarver",
] as const;
export type CraftingProficiency = (typeof CraftingProficiencies)[number];

export const ProficiencyStatuses = ["yes", "wip"] as const;
export type ProficiencyStatus = (typeof ProficiencyStatuses)[number];

export interface PCData {
  name: string;
  status: PCStatus;
  id: number;
  player: string;
  fullName: string;
  race: string;
  subrace?: string;
  class1: string;
  subclass1?: string;
  level1: number;
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
  profAlchemist?: ProficiencyStatus;
  profBrewer?: ProficiencyStatus;
  profCalligrapher?: ProficiencyStatus;
  profCarpenter?: ProficiencyStatus;
  profCartographer?: ProficiencyStatus;
  profCobbler?: ProficiencyStatus;
  profCook?: ProficiencyStatus;
  profGlassblower?: ProficiencyStatus;
  profHerbalist?: ProficiencyStatus;
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
}

type ClassNameEntry = string | undefined | Record<string, any>;

export default function classnames(...entries: ClassNameEntry[]) {
  const classnames: string[] = [];

  for (const e of entries) {
    if (typeof e === "undefined") continue;

    if (typeof e === "string") classnames.push(e);
    else {
      for (const k in e) {
        if (e[k]) entries.push(k);
      }
    }
  }

  return classnames.join(" ");
}

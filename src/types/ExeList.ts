export type ExeList<List extends readonly string[]> = Record<
  List[number],
  boolean
>;

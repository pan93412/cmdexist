/**
 * The test result of the executable files list.
 */
export type ExeList<List extends readonly string[]> = Record<
  List[number],
  boolean
>;

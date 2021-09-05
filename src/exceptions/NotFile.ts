export class NotFile extends Error {
  constructor(public path: string) {
    super(`${path} is not a file.`);
    this.name = "NotFile";
  }
}

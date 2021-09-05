import path from "path";
import fsPromise from "fs/promises";
import { NotFile } from "./exceptions/NotFile";
import { ExeList } from "./types/ExeList";
import { R_OK, X_OK } from "constants";

function GetPath(): string[] {
  const envPaths = process.env["PATH"]?.split(":");
  if (!envPaths) throw new Error("PATH is not defined");

  return envPaths;
}

async function EnsureFileExist(filePath: string): Promise<void> {
  // .stat will throw if the file did not exist.
  const stat = await fsPromise.stat(filePath);

  // then, we check if the file is a file.
  if (!stat.isFile()) throw new NotFile(filePath);

  // finally, we check if the file is executable.
  if (!(stat.mode & (R_OK | X_OK)))
    throw new Error(`${filePath} is not executable`);
}

export async function CheckIfExist(exeName: string): Promise<boolean> {
  const envPaths = GetPath();

  const tasks = envPaths.map(async (envPath) => {
    await EnsureFileExist(path.join(envPath, exeName));
  });

  try {
    // Promise.any() will only throw on rejected.
    await Promise.any(tasks);
    return true;
  } catch (e) {
    return false;
  }
}

export async function CheckIfAllExist<T extends readonly string[]>(
  exeNames: T
): Promise<[boolean, ExeList<T>]> {
  const exeList: Partial<ExeList<T>> = {};

  const promises = exeNames.map(async (exeName: T[number]) => {
    const exist = await CheckIfExist(exeName);

    if (exist) return (exeList[exeName] = true);
    return (exeList[exeName] = false);
  });

  const response = await Promise.all(promises);
  return [response.every((entry) => entry === true), exeList as ExeList<T>];
}

// Export ExeList<T>
export * from "./types";

import commandExists from "command-exists";
import { CheckIfExist } from "../src";

async function commandExistsTest1(cmd: string) {
  await commandExists(cmd);
}

async function commandExistsTest2(cmd: string) {
  try {
    await commandExists(cmd);
    return Promise.reject();
  } catch (e) {
    return Promise.resolve();
  }
}

async function cmdexistTest1(cmd: string) {
  const exist = await CheckIfExist(cmd);
  if (exist) return Promise.resolve();
  return Promise.reject();
}

async function cmdexistTest2(cmd: string) {
  const exist = await CheckIfExist(cmd);
  if (!exist) return Promise.resolve();
  return Promise.reject();
}

async function testMain() {
  const cmdE = ["node", "bash"] as const;
  const cmdNE = ["skmwlerokpdkos", "fomkemwdlfwe"] as const;

  console.time("commandExists - when the exe exists");
  await Promise.all(cmdE.map((cmd) => commandExistsTest1(cmd)));
  console.timeEnd("commandExists - when the exe exists");

  console.time("commandExists - when the exe not exists");
  await Promise.all(cmdNE.map((cmd) => commandExistsTest2(cmd)));
  console.timeEnd("commandExists - when the exe not exists");

  console.time("[our] cmdexist - when the exe exists");
  await Promise.all(cmdE.map((cmd) => cmdexistTest1(cmd)));
  console.timeEnd("[our] cmdexist - when the exe exists");

  console.time("[our] cmdexist - when the exe not exists");
  await Promise.all(cmdNE.map((cmd) => cmdexistTest2(cmd)));
  console.timeEnd("[our] cmdexist - when the exe not exists");
}

testMain();

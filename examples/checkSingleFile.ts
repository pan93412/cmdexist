import { CheckIfExist } from "../src";

CheckIfExist("node").then((exec) => console.log(`node is ${exec}`));
CheckIfExist("abcdef").then((exec) => console.log(`abcdef is ${exec}`));
CheckIfExist("bash").then((exec) => console.log(`bash is ${exec}`));

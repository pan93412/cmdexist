import { CheckIfAllExist } from "../src";

// Set as `const` so TypeScript will correctly show the entries in toCheck array.
const toCheck = ["npm", "node", "yarn", "python", "docker"] as const;

async function main() {
  const [result, details] = await CheckIfAllExist(toCheck);

  details; // We can see that it shows the every entries in `toCheck`.
  console.log(result);
  console.log(details);
}

main();

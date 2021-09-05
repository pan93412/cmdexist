# `cmdexist`

The cross-platform, super-fast and zero-dependencies library
which can check if a command or even the commands bundle exist.

## Usage

```bash
npm i cmdexist
yarn add cmdexist # or if you use yarn
```

```ts
/* SINGLE FILE TO TEST */
function singleFileToTest() {
  CheckIfExist("node").then((exec) => console.log(`node is ${exec}`));
}

/* MULTIPLE FILES TO TEST */
async function multipleFilesToTest() {
  // Set as `const` so TypeScript will correctly show the entries in toCheck array.
  const toCheck = ["npm", "node", "yarn", "python", "docker"] as const;
  const [result, details] = await CheckIfAllExist(toCheck);

  details; // We can see that it shows the every entries in `toCheck`.
  console.log(result);
  console.log(details);
}
```

For more information, See the [docs](https://pan93412.github.io/cmdexist/) and `examples/` folder.

## Benchmarks

See `benchmarks/command-exists.ts`.

```plain
commandExists - when the exe exists: 12.467ms
commandExists - when the exe not exists: 6.156ms
[our] cmdexist - when the exe exists: 0.92ms
[our] cmdexist - when the exe not exists: 0.301ms
```

## Authors

- pan93412 \<<pan93412@gmail.com>\>, 2021.

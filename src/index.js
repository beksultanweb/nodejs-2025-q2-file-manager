import { initCLI } from "./core/initCLI.js";
import { handleCommand } from "./core/commandRouter.js";

const args = process.argv.slice(2);
const rootPath = process.cwd();

const usernameArg = args.find((arg) => arg.startsWith("--username="));
const rawName = usernameArg?.split("=")[1] || "User";
const username = `${rawName[0].toUpperCase()}${rawName.slice(1)}`;

initCLI(username, async (line) => {
  await handleCommand(line, rootPath);
});

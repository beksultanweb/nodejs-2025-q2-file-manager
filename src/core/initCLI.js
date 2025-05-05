import readline from "readline";

export function initCLI(username, onLineHandler) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(`Welcome to the File Manager, ${username}!`);

  rl.on("line", onLineHandler);

  rl.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.pause();
  });
}

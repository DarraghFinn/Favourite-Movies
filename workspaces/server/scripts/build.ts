import esbuild from "esbuild";
import { readFile } from "fs/promises";
import path from "path";

type BuildOptions = {
  env: "production" | "development";
};

export async function createContext(options: BuildOptions) {
  const { env } = options;

  const nodeVersion = (
    await readFile(path.join(__dirname, "../../../.node-version"), "utf8")
  ).trim();

  return await esbuild.context({
    entryPoints: ["./src/index.ts"],
    outfile: "./dist/index.js",
    define: {
      "process.env.NODE_ENV": `"${env}"`,
    },
    external: ["express"], // Some libraries have to be marked as external
    platform: "node", // When building for node we need to setup the environment for it
    target: `node${nodeVersion}`,
    bundle: true,
    minify: env === "production",
    sourcemap: env === "development",
  });
}

async function dev() {
  const context = await createContext({ env: "development" });

  await context.watch();

  console.log("Esbuild rebuilds the server on every file change");
}

async function build() {
  const context = await createContext({ env: "production" });

  await context.dispose();
}

const args = process.argv.slice(2);
if (args[0] === "dev") {
  dev();
} else {
  build();
}

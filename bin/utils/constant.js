import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { version, dependencies } = require("../../package.json");

export { version, dependencies };

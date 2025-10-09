import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const tilesFolder = path.join(__dirname, "../src/assets/tiles");
const outputFile = path.join(tilesFolder, "index.ts");

// Read all SVGs
const files = fs.readdirSync(tilesFolder).filter((f) => f.endsWith(".svg"));

// Generate imports & exports
let imports = "";
let exports = "export const rawTileSvgLookup = {\n";

const nameConverter = (name) => {
  return name;
};

files.forEach((file) => {
  const name = path.basename(file, ".svg");
  const varName = name.replace(/[^a-zA-Z0-9]/g, "_");
  imports += `import ${varName} from './${file}';\n`;
  exports += `  '${nameConverter(name)}': ${varName},\n`;
});

exports += "};\n";

const comment =
  "// This is a script generated file, do not modify\n// run `yarn generate-tile-svgs` to regenerate it\n\n";

// Write index.ts
fs.writeFileSync(outputFile, comment + imports + "\n" + exports);

console.log("✅ tiles/index.ts generated with", files.length, "tiles.");

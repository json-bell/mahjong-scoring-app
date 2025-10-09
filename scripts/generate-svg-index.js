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
let miscExports = "export const miscTileSvgs = {\n";

// Convert SVG names to TileSlugs
const lookup = {
  d: { suit: "dragon", values: ["_", "red", "green", "white"] },
  f: { suit: "wind", values: ["_", "east", "south", "west", "north"] },
  s: { suit: "bamboo" },
  t: { suit: "circle" },
  w: { suit: "character" },
};

const miscLookup = {
  hide: "hidden",
  xx: "error",
  any: "any",
};

const svgNameParser = (name) => {
  const cleanName = name.replace("-", "").replace("MJ", "");
  if (miscLookup[cleanName])
    return { parsedName: miscLookup[cleanName], isGameTile: false };

  const suitChar = cleanName[0];
  const { suit, values } = lookup[suitChar];
  if (!values)
    return { parsedName: `${cleanName[1]}-${suit}`, isGameTile: true };

  return {
    parsedName: `${values[Number(cleanName[1])]}-${suit}`,
    isGameTile: true,
  };
};

files.forEach((file) => {
  const name = path.basename(file, ".svg");
  const varName = name.replace(/[^a-zA-Z0-9]/g, "_");
  const { parsedName, isGameTile } = svgNameParser(name);
  imports += `import ${varName} from './${file}';\n`;
  if (isGameTile) {
    exports += `  '${parsedName}': ${varName},\n`;
  } else {
    miscExports += `  '${parsedName}': ${varName},\n`;
  }
});

exports += "};\n";
miscExports += "};\n";

const comment =
  "// This is a script generated file, do not modify\n// run `yarn generate-tile-svgs` to regenerate it\n\n";

// Write index.ts
fs.writeFileSync(
  outputFile,
  comment + imports + "\n" + exports + "\n" + miscExports
);

console.log("✅ tiles/index.ts generated with", files.length, "tiles.");

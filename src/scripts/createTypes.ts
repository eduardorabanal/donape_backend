import { generateNamespace } from "@gql2ts/from-schema";
import * as fs from "fs";
import { genSchema } from "../utils/genSchema";
import * as path from "path";

const tsTypes = generateNamespace("GQL", genSchema());
fs.writeFile(path.join(__dirname, "../types/schema.d.ts"), tsTypes, err => {
  console.log(err);
});

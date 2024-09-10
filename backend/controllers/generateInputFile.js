import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dirInput = path.join(__dirname, "input");

const generateInputFile = async (inp) => {
  if (!fs.existsSync(dirInput)) {
    fs.mkdirSync(dirInput, { recursive: true });
  }
  const fileId = uuid();
  const inputFilename = `${fileId}.txt`;
  const inputFilepath = path.join(dirInput, inputFilename);
  fs.writeFileSync(inputFilepath, inp);
  return inputFilepath;
};

export { generateInputFile };

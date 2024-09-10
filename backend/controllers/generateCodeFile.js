import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dirCodes = path.join(__dirname, "codes");

const generateCodeFile = async (lan, code) => {
  if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
  }
  const fileId = uuid();
  const fileName = `${fileId}.${lan}`;
  const filePath = path.join(dirCodes, fileName);
  fs.writeFileSync(filePath, code);
  return filePath;
};

export { generateCodeFile };

import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { exec } from "node:child_process";
const dirOutput = path.join(__dirname, "output");

const executeCpp = async (filepath) => {
  if (!fs.existsSync(dirOutput)) {
    fs.mkdirSync(dirOutput, { recursive: true });
  }
  const fileId = path.basename(filepath).split(".")[0];
  const outputFilename = `${fileId}.out`;
  const outputFilePath = path.join(dirOutput, outputFilename);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outputFilePath} && cd ${dirOutput} && .\\${outputFilename}`,
      (error, stdout, stderr) => {
        const fileNameRegex3 = `${outputFilePath} && cd ${dirOutput} && .\\${outputFilename}`;
        const filePathname = `${filepath}`;
        const fileNameRegex =
          /([a-zA-Z]:[\\\/].*?\.(cpp|h))|([\\\/].*?\.(cpp|h))/g;

        if (error) {
          // Remove file paths from the error message
          let cleanedError = error.message.replace(fileNameRegex, "").trim();

          // Ensure filePathname is treated as a string and remove all occurrences
          const cleanedError2 = cleanedError
            .replace(new RegExp(String(filePathname), "g"), "")
            .trim();
          const finalanms = cleanedError2
            .replace(fileNameRegex3, "")
            .trim()
            .replace("g++  -o", "")
            .trim();
          // console.log("Trimmed: ", cleanedError2);
          return reject(finalanms);
        }

        if (stderr) {
          // Remove file paths from stderr
          let cleanedError = error.message.replace(fileNameRegex, "").trim();

          // Ensure filePathname is treated as a string and remove all occurrences
          const cleanedError2 = cleanedError
            .replace(new RegExp(String(filePathname), "g"), "")
            .trim();
          const finalanms = cleanedError2
            .replace(fileNameRegex3, "")
            .trim()
            .replace("g++  -o", "")
            .trim();
          return reject(finalanms);
        }

        resolve(stdout); // Resolve the standard output if no errors
      }
    );
  });
};

//Generate executable file with input
const executeCppWithInput = async (filepath, inputFile) => {
  if (!fs.existsSync(dirOutput)) {
    fs.mkdirSync(dirOutput, { recursive: true });
  }
  const fileId = path.basename(filepath).split(".")[0];
  const outputFilename = `${fileId}.out`;
  const outputFilePath = path.join(dirOutput, outputFilename);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outputFilePath} && cd ${dirOutput} && .\\${outputFilename} < ${inputFile}`,
      (error, stdout, stderr) => {
        // console.log(
        //   `g++ ${filepath} -o ${outputFilePath} && cd ${dirOutput} && .\\${outputFilename} < ${inputFile}`
        // );
        const fileNameRegex3 = `${outputFilePath} && cd ${dirOutput} && .\\${outputFilename} < ${inputFile}`;
        const filePathname = `${filepath}`;
        const fileNameRegex =
          /([a-zA-Z]:[\\\/].*?\.(cpp|h))|([\\\/].*?\.(cpp|h))/g;

        if (error) {
          // Regular expression to remove all occurrences of the filename and paths
          let cleanedError = error.message.replace(fileNameRegex, "").trim();

          // Ensure filePathname is treated as a string and remove all occurrences
          const cleanedError2 = cleanedError
            .replace(new RegExp(String(filePathname), "g"), "")
            .trim();
          const finalanms = cleanedError2
            .replace(fileNameRegex3, "")
            .trim()
            .replace("g++  -o", "")
            .trim();
          // console.log("Trimmed: ", cleanedError2);
          return reject(finalanms);
        }

        if (stderr) {
          let cleanedError = error.message.replace(fileNameRegex, "").trim();

          // Ensure filePathname is treated as a string and remove all occurrences
          const cleanedError2 = cleanedError
            .replace(new RegExp(String(filePathname), "g"), "")
            .trim();
          const finalanms = cleanedError2
            .replace(fileNameRegex3, "")
            .trim()
            .replace("g++  -o", "")
            .trim();
          // console.log("Trimmed: ", cleanedError2);
          return reject(finalanms);
        }
        resolve(stdout);
      }
    );
  });
};

export { executeCpp, executeCppWithInput };

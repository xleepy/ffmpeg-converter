const prompt = require("prompt");
const { convert } = require("./converter");

prompt.start();

prompt.get(
  ["input", "output", { name: "format", default: "mp4" }],
  (err, { input, output, format }) => {
    console.group("Received");
    console.log("input path", input);
    console.log("output path", output);
    console.log("format", format);
    console.groupEnd();

    convert(input, output, format);
  }
);

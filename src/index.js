const prompt = require("prompt");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

prompt.start();

prompt.get(
  ["input", "output", { name: "format", default: "mp4" }],
  (err, { input, output, format }) => {
    console.group("Received");
    console.log("m3u8 path", input);
    console.log("mp4 path", output);
    console.groupEnd();

    ffmpeg(path.resolve(input))
      .inputOptions("-protocol_whitelist file,http,https,tcp,tls,crypto")
      .toFormat(format)
      .save(path.resolve(output))
      .on("error", (err) => console.error(err))
      .on("start", function (commandLine) {
        console.log("Spawned Ffmpeg with command: " + commandLine);
      })
      .on("progress", function (progress) {
        console.log("----------------------");
        console.log(JSON.stringify(progress));
        console.log("----------------------");
      })
      .on("end", function () {
        console.log("Transcoding succeeded !");
      })
      .run();
  }
);

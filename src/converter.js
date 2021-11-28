const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

const isURL = (input) =>
  /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi.test(
    input
  );

const convert = (input, output, format) => {
  ffmpeg(isURL(input) ? input : path.resolve(input))
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
};

module.exports = {
  convert,
};

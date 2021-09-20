/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 24-08-2021
 * @modify date 20-09-2021
 * @desc [Dailymotion Controller]
 */

const { validatedailyURL } = require("../helpers/validations");
const ytld = require("youtube-dl-exec");

const index = {
  dailymotion: (req, res, next) => {
    const { error } = validatedailyURL(req.body);
    if (error) return next(error);

    const { url } = req.body;

    ytld(
      url,
      {
        dumpSingleJson: true,
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
      },
      ["--format=bestvideo+bestaudio"]
    )
      .then((result) => {
        /* return res.status(422).jsonp(result); */
        if (result.hasOwnProperty("tbr")) {
          const {
            _filename: filename,
            ext: extension,
            height: format,
            description,
            uploader,
            fulltitle: title,
            url: urlDownload,
            thumbnail,
          } = result;

          return res.status(200).json({
            status: "Success",
            filename,
            extension,
            format,
            description,
            uploader,
            title,
            thumbnail,
            urlDownload,
          });
        } else {
          next(new Error("Failed, Please check the URL!"));
        }
      })
      .catch((err) => {
        next(
          err.message.includes("Unable to download API page")
            ? new Error("No internet, Check your network")
            : err
        );
      });
  },
};

module.exports = index;

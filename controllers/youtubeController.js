/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 24-08-2021
 * @modify date 20-09-2021
 * @desc [Youtube Controller]
 */

const youtubeDl = require("youtube-dl-exec");
const { validateYoutubeURL } = require("../helpers/validations");

const index = {
  youtubeDL: async (req, res, next) => {
    const { error } = validateYoutubeURL(req.body);
    if (error) return next(error);

    const { url } = req.body;
    const video_id = url.split("v=")[1];
    const ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition != -1)
      video_id = video_id.substring(0, ampersandPosition);

    youtubeDl(
      video_id,
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
      .then((output) => {
        //return res.status(422).jsonp(output);
        if (output.hasOwnProperty("uploader_url")) {
          const {
            uploader_url: ownerUrl,
            uploader_id: ownerId,
            channel_url: channelUrl,
            uploader,
            view_count: totalViews,
            id: urlId,
            thumbnail,
            _filename: filename,
            duration,
            title,
            categories,
            formats,
          } = output;
          const dataFormats = [];
          formats.map((item) => {
            if (
              item.ext === "mp4" &&
              item.format_note !== "144p" &&
              item.format_note !== "240p" &&
              item.format_note !== "360p"
            ) {
              const { url, format, format_note, ext, filesize, fps } = item;

              dataFormats.push({
                url,
                format,
                format_note,
                ext,
                filesize,
                fps,
              });
            }
          });

          return res.status(200).json({
            status: "Success",
            response: {
              title,
              ownerUrl,
              ownerId,
              channelUrl,
              uploader,
              totalViews,
              urlId,
              thumbnail,
              filename,
              duration,
              categories,
              dataFormats,
            },
          });
        } else {
          next(new Error("Failed, Please check the URL!"));
        }
      })
      .catch((err) =>
        next(
          err.message.includes("Unable to download API page")
            ? new Error("No internet, Check your network")
            : err.message.includes("is not a valid UR")
            ? new Error("Invalid URL, Please check the URL!")
            : err
        )
      );
  },
};
module.exports = index;

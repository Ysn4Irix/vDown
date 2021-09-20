/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 24-08-2021
 * @modify date 20-09-2021
 * @desc [Tiktok Controller]
 */

const tiktokScraper = require("tiktok-scraper");
const { validateTiktokURL } = require("../helpers/validations");

const index = {
  tiktok: async (req, res, next) => {
    const { error } = validateTiktokURL(req.body);
    if (error) return next(error);

    const { url } = req.body;

    await tiktokScraper
      .getVideoMeta(url, {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
        },
        noWaterMark: true,
        hdVideo: true,
      })
      .then((data) => {
        if (data.hasOwnProperty("headers")) {
          const { headers, collector } = data;
          /*  return res.json({
            headers,
            collector,
          }); */

          const {
            authorMeta,
            text: description,
            imageUrl: thumbnail,
            videoUrl: urlDownload,
            videoMeta,
          } = collector[0];

          const {
            id,
            name: username,
            nickName: name,
            avatar: profilePic,
            following,
            fans: followers,
            heart: likes,
            video: totalVideos,
            verified,
            private,
          } = authorMeta;

          const { ratio: format } = videoMeta;

          res.json({
            status: "success",
            headers,
            id,
            username,
            name,
            profilePic,
            following,
            followers,
            likes,
            totalVideos,
            verified,
            private,
            description: description === "" ? null : description,
            thumbnail,
            format,
            urlDownload,
          });
        } else {
          next(new Error("Failed, Please check the URL!"));
        }
      })
      .catch(() => {
        next("Failed check your URL");
      });
  },
};

module.exports = index;

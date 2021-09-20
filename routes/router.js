/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 24-08-2021
 * @modify date 20-09-2021
 * @desc [Routes]
 */

const router = require("express").Router();
const { youtubeDL } = require("../controllers/youtubeController");
const { tiktok } = require("../controllers/tiktokController");
const { dailymotion } = require("../controllers/dailymotionController");
const { instagram } = require("../controllers/instagramController");

/* Send Welcome response. */
router.get("/", (req, res) => {
  res.status(200).json({
    Response: [
      {
        message: "Hello for vDown API 🤖",
      },
    ],
  });
});

/* post youtube response. */
router.get("/youtube", youtubeDL);

/* post tiktok response. */
router.post("/tiktok", tiktok);

/* post instagram response. */
router.post("/instagram", instagram);

/* post tiktok response. */
router.post("/dailymotion", dailymotion);

module.exports = router;

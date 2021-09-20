/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 24-08-2021
 * @modify date 20-09-2021
 * @desc [Instagram Controller]
 */

const { validateInstagramURL } = require("../helpers/validations");
const axios = require("axios");

const index = {
  instagram: async (req, res, next) => {
    const { error } = validateInstagramURL(req.body);
    if (error) return next(error);

    const { url } = req.body;

    const finalurl = url.slice(-1) === "/" ? url + "?__a=1" : url + "/?__a=1";
    //return res.status(422).jsonp(finalurl);

    await axios
      .get(finalurl)
      .then((response) => {
        //return console.log(response.data);
        const { data } = response;
        if (data.hasOwnProperty("graphql")) {
          const { shortcode_media } = data.graphql;

          const { __typename: postType } = shortcode_media;

          if (
            postType != "GraphImage" &&
            postType != "GraphSidecar" &&
            postType != "GraphVideo"
          ) {
            next(new Error("No Post Type Found"));
          } else {
            const { display_url: displayUrl, edge_media_to_caption } =
              shortcode_media;

            const { edges: captionCheck } = edge_media_to_caption;

            const caption =
              captionCheck.length == 1 ? captionCheck[0].node.text : "";

            const {
              username: owner,
              is_verified,
              profile_pic_url: profile_pic,
              full_name,
              is_private,
              edge_owner_to_timeline_media,
            } = shortcode_media.owner;

            const total_media = edge_owner_to_timeline_media.count;
            const hashtags = caption.match(/#\w+/g);

            //GraphImage = single image post
            if (postType === "GraphImage") {
              const dataDownload = displayUrl;

              res.status(200).json({
                status: "success",
                postType: "SingleImage",
                displayUrl,
                caption,
                owner,
                is_verified,
                profile_pic,
                full_name,
                is_private,
                total_media,
                hashtags,
                dataDownload,
              });
              //GraphSidecar = multiple post
            } else if (postType === "GraphSidecar") {
              const downloadedData = [];

              shortcode_media.edge_sidecar_to_children.edges.map((post) => {
                const { is_video, display_url, video_url } = post.node;

                const placeholder_url = !is_video ? display_url : video_url;

                downloadedData.push({
                  is_video,
                  placeholder_url,
                });
              });

              res.status(200).json({
                status: "success",
                postType: "MultiplePost",
                caption,
                owner,
                is_verified,
                profile_pic,
                full_name,
                is_private,
                total_media,
                hashtags,
                downloadedData,
              });

              //GraphVideo = video post
            } else if (postType === "GraphVideo") {
              const videoUrl = shortcode_media.video_url;
              //return res.status(422).jsonp(dataDownload);

              res.status(200).json({
                status: "success",
                postType: "SingleVideo",
                displayUrl,
                caption,
                owner,
                is_verified,
                profile_pic,
                full_name,
                is_private,
                total_media,
                hashtags,
                videoUrl,
              });
            }
          }
        } else {
          next(new Error("Failed to get a response from this URL"));
        }
      })
      .catch((err) => {
        next(new Error("Error while getting a response" + err));
      });
  },
};

module.exports = index;

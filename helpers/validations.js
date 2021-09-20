/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 24-08-2021
 * @modify date 20-09-2021
 * @desc [User Schema Validation]
 */

const joi = require("joi");

const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

const validateYoutubeURL = (data) => {
  const schema = joi.object({
    url: joi
      .string()
      .trim()
      .pattern(
        new RegExp("^(https?://)?(www.youtube.com|youtube.com|youtu.?be)/.+$")
      )
      .required()
      .messages({
        "string.pattern.base": "URL must be a valid youtube video url",
      }),
  });
  return schema.validate(data, options);
};

const validateTiktokURL = (data) => {
  const schema = joi.object({
    url: joi
      .string()
      .trim()
      .pattern(new RegExp("^(https?://)?(www.tiktok.com|tiktok.com)/.+$"))
      .required()
      .messages({
        "string.pattern.base": "URL must be a valid tiktok video url",
      }),
  });
  return schema.validate(data, options);
};

const validatedailyURL = (data) => {
  const schema = joi.object({
    url: joi
      .string()
      .trim()
      .pattern(
        new RegExp("^(https?://)?(www.dailymotion.com|dailymotion.com)/.+$")
      )
      .required()
      .messages({
        "string.pattern.base": "URL must be a valid dailymotion video url",
      }),
  });
  return schema.validate(data, options);
};

const validateInstagramURL = (data) => {
  const schema = joi.object({
    url: joi
      .string()
      .trim()
      .pattern(
        new RegExp(
          "^(https?://)?(www.instagram.com|instagram.com|instagr.?am)/.+$"
        )
      )
      .required()
      .messages({
        "string.pattern.base":
          "URL must be a valid instagram video or post url",
      }),
  });
  return schema.validate(data, options);
};

module.exports = {
  validateYoutubeURL,
  validatedailyURL,
  validateInstagramURL,
  validateTiktokURL,
};

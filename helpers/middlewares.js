/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 24-08-2021
 * @modify date 20-09-2021
 * @desc [Middlewares]
 */

const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const notFound = (req, res, next) => {
  const error = new Error(`Request Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message:
      process.env.NODE_ENV === "production"
        ? "An Error Occured"
        : error.message,
    stack: process.env.NODE_ENV === "production" ? "🙄 🙄" : error.stack,
  });
};

const slowerDown = slowDown({
  windowMs: 30 * 1000,
  delayAfter: 1,
  delayMs: 300,
});

const reqLimiter = rateLimit({
  windowMs: 40 * 1000,
  max: 4,
  message: {
    status: 429,
    response: "Too many requests from this IP, please try again after 40s",
  },
});

module.exports = {
  notFound,
  errorHandler,
  slowerDown,
  reqLimiter,
};

const fs = require("fs")

const logger = (req, res, next) => {
  const logData = `User: ${req.user.username}, Role: ${req.user.role}\n`;
  fs.appendFileSync("logs.txt", logData,)
  next()
};

module.exports = {
  logger,
};


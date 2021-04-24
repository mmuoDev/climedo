const { body, validationResult } = require("express-validator");

module.exports = {

  validate: (req, res, next) => {
    const raw_errors = validationResult(req);

    if (raw_errors.isEmpty()) {
      return next()
    }
    const errors = raw_errors.errors.map((err) => ({ message: err.msg }));

    return res.status(422).json({ status: "error", errors });
  },

  validateDataPoints: () => {
    return [
      body("dataPoints").custom(async (value) => {
        value
          .forEach(function (dataPoint) {
            var options = ["selection", "number", "text", "date"];
            let dataValue = dataPoint.dataType ? dataPoint.dataType : "";
            if (options.indexOf(dataValue.toLowerCase()) !== -1) {
              return Promise.reject();
            }
          })
          .withMessage("Invalid data point");
      }),
    ];
  },
};

const { body, validationResult } = require("express-validator");

module.exports = {
  validate: (req, res, next) => {
    const raw_errors = validationResult(req);

    if (raw_errors.isEmpty()) {
      return next();
    }
    const errors = raw_errors.errors.map((err) => ({ message: err.msg }));

    return res.status(422).json({ status: "error", errors });
  },

  validateParameters: () => {
    return [
      body("name").exists().withMessage("The name is required!"),
      body("description").exists().withMessage("The description is required"),
      body("dataPoints")
        .isArray()
        .withMessage("Datapoints can not be empty and must be an array!"),
      body("dataPoints").custom(async (value) => {
        if (value !== undefined) {
          if (value.length == 0) {
            throw new Error("At least one dataPoint is required!");
          }
          if (value.length > 0) {
            value.forEach(function (dataPoint) {
              var options = ["selection", "number", "text", "date"];
              let dataValue = dataPoint.dataType ? dataPoint.dataType : "";
              console.log(options.indexOf(dataValue.toLowerCase()));
              if (options.indexOf(dataValue.toLowerCase()) == -1) {
                throw new Error("Wrong dataType for a dataPoint");
              }
            });
          }
        }
      }),
    ];
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

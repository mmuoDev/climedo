const { validationResult } = require('express-validator');

module.exports = {
    
    validateDataPoints: (req, res, next) => {
        var options = ["selection", "number", "text", "date"];
        let dataPoints = req.body.dataPoints
        dataPoints.forEach(function (dataPoint) {
            let dataValue = dataPoint.dataType ? dataPoint.dataType : ''
            if(options.indexOf(dataValue.toLowerCase()) !== -1){
                return res.status(422).json({ status: 'error', errors })
            }
        });
        return next()
    },

    validate: (req, res, next) => {
        const raw_errors = validationResult(req)

        if (raw_errors.isEmpty()) {
            return next()
        }

        const errors = raw_errors.errors.map(err => ({ message: err.msg }))

        return res.status(422).json({ status: 'error', errors })
    }
}
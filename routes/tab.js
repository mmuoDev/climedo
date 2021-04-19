const routes = require('express').Router()
const tabService = require('../services/tabService')
const { handleError } = require('../helpers/errorHandler')
const { validate, validateDataPoints } = require('../middlewares/validators')

routes.post('/', validate, validateDataPoints, (req, res) => {
    tabService.add(req.body.name, req.body.description, req.body.dataPoints).then(tab => {
        res.status(201).json({ message: 'tab added', data: tab })
    }).catch(error => {
        handleError(error, res)
    })
})

routes.put('/:id', validate, (req, res) => {
    tabService.update(req.body.name, req.body.description, req.body.dataPoints).then(tab => {
        res.status(204).json({ message: 'tab updated'})
    }).catch(error => {
        handleError(error, res);
    })
})

routes.post('/',  (req, res) => {
    tabService.get().then(tab => {
        res.status(200).json({ message: 'tab fetched', data: tab })
    }).catch(error => {
        handleError(error, res)
    })
})


module.exports = routes;
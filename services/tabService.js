const tabModel = require('../models/tab.model')
const { ErrorHandler } = require('../helpers/errorHandler');

//adds a tab
async function add(name, description, dataPoints) {

    tab = new tabModel(req.body)
    try{
        return await tab.save()
    }catch(err){
        throw new ErrorHandler(500, "Unable to add tab at this time. Please try again later.");
    }
}
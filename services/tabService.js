const tabModel = require('../models/tab.model')
const { ErrorHandler } = require('../helpers/errorHandler');

module.exports = {
    //adds a tab
    add : async  (name, description, dataPoints) => {
        
        try{
            const tab = { name, description, dataPoints }
            return tabModel.save(tab)
        }
        catch(err){
            throw new ErrorHandler(500, "Unable to add tab at this time. Please try again later.");
        }
    },

    //updates a tab
    update: async (name, description, dataPoints, tabID) => {
        try{
            const tab = { name, description, dataPoints }
            return tabModel.findByIdAndUpdate(tabID, tab, { useFindAndModify: false })
        }
        catch(err){
            throw new ErrorHandler(500, "Unable to update tab at this time. Please try again later.");
        }
    },

    //get all tabs
    get: async () => {
        try{
            return tabModel.find()
        }
        catch(err){
            throw new ErrorHandler(500, "Unable to fetch tabs at this time. Please try again later.");
        }
    }
}

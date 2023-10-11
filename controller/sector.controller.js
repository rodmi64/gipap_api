const oSectorModel = require("../model/sector.model")
class SectorController
{
    static async readSectorController(){
        return await oSectorModel.readSectorModel()
    }
}


module.exports = SectorController
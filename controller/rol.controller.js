const RolModel = require("../model/rol.model")
class RolController
{
    static async readRolController(){
        return await RolModel.readRolModel()
    }
}

module.exports = RolController
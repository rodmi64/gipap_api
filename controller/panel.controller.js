const PanelModel = require("../model/panel.model")
class PanelController
{
    static async readPanelAdminCardController(){
        return await PanelModel.readPanelAdminCardModel()
    }
}

module.exports = PanelController
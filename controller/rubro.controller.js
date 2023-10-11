const RubroModel = require("../model/rubro.model")
class RubroController
{
    static async readPagoRubroController(code_departamento,estado){
        return await RubroModel.readPagoRubroModel(code_departamento,estado)
    }

    static async readPagoRubroUsuarioController(email,estado)
    {
        return await RubroModel.readPagoRubroUsuarioModel(email,estado)
    }

    static async sendReciboPagoRubroController(id_pago,foto,cuenta)
    {
        return  await RubroModel.sendReciboPagoRubroModel(id_pago,foto,cuenta)
    }

    static async updatePagoRubroController(id_pago,estado,detalle)
    {
        return await RubroModel.updatePagoRubroModel(id_pago,estado,detalle)
    }

    static async readAllTipoRubroController(){
        return await RubroModel.readAllTipoRubroModel()
    }

    static async insertNuevoRubroController(code_departamento, id_rubro,motivo)
    {
        return await RubroModel.insertNuevoRubroModel(code_departamento, id_rubro,motivo)
    }
}

module.exports = RubroController
const SoporteModel = require("../model/soporte.model")
class SoporteController
{
    static async insertNuevoSoporteController(fk_tipo_soporte, detalle_soporte, usuario_emisor_ticket,
                                         url_img, url_archivo, asunto_soporte)
    {
        return await SoporteModel.insertNuevoSoporteModel(fk_tipo_soporte, detalle_soporte, usuario_emisor_ticket,
            url_img, url_archivo, asunto_soporte)
    }
    static async readAllTipoSoporteController(){
        return await SoporteModel.readAllTipoSoporteModel()
    }

    static async readAllSoporteController(tipo_soporte,email_receptor,estado_soporte)
    {
        return await SoporteModel.readAllSoporteModel(tipo_soporte,email_receptor,estado_soporte)
    }

    static async readAllSoporteUsuarioController(tipo_soporte,email_receptor,estado_soporte)
    {
        return await SoporteModel.readAllSoporteUsuarioModel(tipo_soporte,email_receptor,estado_soporte)
    }

    static async updateSoporteController(id_soporte,usuario_receptor_ticket,solucion_ticket,estado){
        return await SoporteModel.updateSoporteModel(id_soporte,usuario_receptor_ticket,solucion_ticket,estado)
    }
}

module.exports = SoporteController
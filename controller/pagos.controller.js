const PagosModel = require("../model/pagos.model")
const BancoModel = require("../model/banco.model");
class PagosController
{
    static async readPagoAdminModel(fechaI,fechaF,code_depa,recibo,tipo){
        return await PagosModel.readPagoAdminModel(fechaI,fechaF,code_depa,recibo,tipo)
    }

    static async pagoArreindoAdminController(id_pago_departamento_,estado_,detalle){
        return await PagosModel.pagoArreindoAdminModel(id_pago_departamento_,estado_,detalle)
    }

    static async readPagoUsuarioController(fechaI,fechaF,tipo,usuario){
        return await PagosModel.readPagoUsuarioModel(fechaI,fechaF,tipo,usuario)
    }

    static async sendReciboPagoController(foto,cuenta,id_pago)
    {
        return await PagosModel.sendReciboPagoModel(foto,cuenta,id_pago)
    }
}

module.exports = PagosController
const  BancoModel = require("../model/banco.model")
class BancoController
{
    static async readTipoBancoController()
    {
        return await BancoModel.readTipoBancoModel()
    }

    static async readMiCuentaBancariasController(usuario)
    {
        return await BancoModel.readMiCuentaBancariasModel(usuario)
    }

    static async insertCuentaBancoController(num_cuenta_bancaria, usuario, banco)
    {
        return await BancoModel.insertCuentaBancoModel(num_cuenta_bancaria, usuario, banco)
    }


}

module.exports = BancoController
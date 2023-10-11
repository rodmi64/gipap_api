const connDB = require("../config/conn")
class BancoModel
{
    static async insertCuentaBancoModel(num_cuenta_bancaria, usuario, banco)
    {
        try {
            var conn = await connDB().promise()
            var sql = "insert into cuenta_bancaria(num_cuenta_bancaria, fk_email_usuario, fk_banco) " +
                "VALUES ('"+num_cuenta_bancaria+"','"+usuario+"',"+banco+")"
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }
    static async readTipoBancoModel()
    {
        try {
            var conn = await connDB().promise()
            var sql = "select B.id_banco,B.detalle_banco from banco as B"
            var data = await conn.query(sql)
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async readMiCuentaBancariasModel(usuario)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select B.id_banco," +
                "concat(CB.num_cuenta_bancaria,' ',B.detalle_banco) string_banco,B.detalle_banco,CB.num_cuenta_bancaria from " +
                "cuenta_bancaria as CB inner join banco as B on B.id_banco = CB.fk_banco " +
                "where CB.fk_email_usuario = '"+usuario+"'"
            var data = await conn.query(sql)
            return data[0]
        }catch (e) {
            console.log(e)
        }
    }


}

module.exports = BancoModel
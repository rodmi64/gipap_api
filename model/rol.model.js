const connDB = require("../config/conn")
class RolModel
{
    static async readRolModel()
    {
        try {
            var conn = await connDB().promise()
            var data = await conn.query("select R.id_rol,R.detalle from rol as R where R.estado = 1")
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }
}

module.exports = RolModel
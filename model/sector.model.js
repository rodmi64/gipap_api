const connDB = require("../config/conn")
class SectorModel
{
    static async readSectorModel()
    {
        try {
            var conn = await connDB().promise()
            var data = await conn.query("select S.code_sector,S.detalle from sector as S where S.estado = 1")
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }
}

module.exports = SectorModel
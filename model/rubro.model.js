const connDB = require("../config/conn")
class RubroModel
{
    static async readPagoRubroModel(code_departamento,estado)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select PB.id_pago_rubro,PB.foto_recibo,R.detalle_rubro,PB.fk_id_rubro,PB.fk_code_departamento,PB.fk_email_usuario,R.precio_rubro," +
                "U.nombre_usuario,convert(PB.fechaAsignacion,char(150)) fechaAsignacion,PB.estado from pago_rubro as PB inner join usuario as U " +
                "on U.email_usuario = PB.fk_email_usuario inner join rubro as R on R.id_rubro = PB.fk_id_rubro where PB.estado in (1,2)"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async readPagoRubroUsuarioModel(email,estado)
    {
        var sqlEstado = ""
        if(estado === "*")
        {
            sqlEstado = " PB.estado != 0 "
        }else{
            sqlEstado = " PB.estado = "+estado
        }

        try {
            var conn = await connDB().promise()
            var sql = "select PB.id_pago_rubro,PB.foto_recibo,R.detalle_rubro,PB.fk_id_rubro,PB.fk_code_departamento,PB.fk_email_usuario,R.precio_rubro," +
                "U.nombre_usuario,convert(PB.fechaAsignacion,char(150)) fechaAsignacion,PB.estado from pago_rubro as PB inner join usuario as U " +
                "on U.email_usuario = PB.fk_email_usuario inner join rubro as R on R.id_rubro = PB.fk_id_rubro " +
                "where "+sqlEstado+" and PB.fk_email_usuario = '"+email+"'"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async sendReciboPagoRubroModel(id_pago,foto,cuenta)
    {
        try {
            var conn = await connDB().promise()
            var sql = "update pago_rubro set foto_recibo = '"+foto+"',estado = 2,fk_cuenta_banco = '"+cuenta+"' where id_pago_rubro = "+id_pago
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    static async updatePagoRubroModel(id_pago,estado,detalle)
    {
        try {
            var conn = await connDB().promise()
            var sql = "update pago_rubro set estado = "+estado+",detalle = '"+detalle+"' where id_pago_rubro = "+id_pago
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    static async readAllTipoRubroModel()
    {
        try {
            var conn = await connDB().promise()
            var data = await conn.query("select R.id_rubro,R.detalle_rubro,R.precio_rubro from rubro as R where R.estado = 1")
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async insertNuevoRubroModel(code_departamento, id_rubro,motivo)
    {
        if(motivo == null){
            motivo = ''
        }
        try {
            var conn =  await connDB().promise()
            var sql = "insert into pago_rubro(fk_code_departamento, fk_id_rubro, " +
                "fechaAsignacion,motivo,estado) VALUES ('"+code_departamento+"',"+id_rubro+",now(),'"+motivo+"',1)"
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
        }
        return false
    }
}

module.exports = RubroModel
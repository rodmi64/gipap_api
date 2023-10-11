const connDB = require("../config/conn")
class ServicioModel
{
    static async readTipoServicioModel()
    {
        try {
            var conn =  await connDB().promise()
            var data = await conn.query("select * from tipo_servicio where estado = 1")
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
        }
        return []
    }

    static async readAllReservasModel(fecha,servicios)
    {
        var oSqlFecha = ""
        var oSqlServicio = ""
        if(fecha != null){
            oSqlFecha = " where fechaReserva = date('"+fecha+"') "
        }

        if(Array.isArray(servicios))
        {
            oSqlServicio = " where id_tipo_servicio in ("+servicios+")"
        }

        try {
            var conn =  await connDB().promise()
            var sql = "select * from (select id_reserva_servicio,estado_reserva,TS.id_tipo_servicio,TS.detalle_servicio,U.email_usuario," +
                "U.nombre_usuario,U.telefono_usuario,convert(RS.fechaReserva,char(150)) fechaReserva," +
                "concat(TIME_FORMAT(RS.hora_inicio_reserva, '%H:%i'),' ',TIME_FORMAT(RS.hora_fin_reserva, '%H:%i')) hora from reserva_servicio as RS inner join tipo_servicio as TS " +
                "on TS.id_tipo_servicio = RS.fk_id_tipo_servicio inner join usuario as U on " +
                "U.email_usuario = RS.fk_email_usuario "+oSqlFecha+" order by RS.fechaReserva desc) as table1 "+oSqlServicio+" order by fechaReserva desc"
            //console.log(sql)
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
        }
        return []
    }

    static async readAllReservasUsuarioModel(fecha,servicios,usuario)
    {
        var oSqlFecha = ""
        var oSqlServicio = ""
        if(fecha != null){
            oSqlFecha = " and fechaReserva = date('"+fecha+"') "
        }

        if(Array.isArray(servicios))
        {
            oSqlServicio = " where id_tipo_servicio in ("+servicios+")"
        }

        try {
            var conn =  await connDB().promise()
            var sql = "select * from (select id_reserva_servicio,estado_reserva,TS.id_tipo_servicio,TS.detalle_servicio,U.email_usuario," +
                "U.nombre_usuario,U.telefono_usuario,convert(RS.fechaReserva,char(150)) fechaReserva," +
                "concat(TIME_FORMAT(RS.hora_inicio_reserva, '%H:%i'),' ',TIME_FORMAT(RS.hora_fin_reserva, '%H:%i')) hora from reserva_servicio as RS inner join tipo_servicio as TS " +
                "on TS.id_tipo_servicio = RS.fk_id_tipo_servicio inner join usuario as U on " +
                "U.email_usuario = RS.fk_email_usuario where fk_email_usuario = '"+usuario+"' "+oSqlFecha+" order by RS.fechaReserva desc) as table1 "+oSqlServicio+" order by fechaReserva desc"
            //console.log(sql)
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
        }
        return []
    }

    static async insertNuevoServicioModel(name,horaI,horaF)
    {
        try {
            var conn = await connDB().promise()
            await conn.query("insert into tipo_servicio(detalle_servicio, hora_inicio, hora_fin) values ('"+name+"','"+horaI+"','"+horaF+"')")
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    static async updateEstadoServicioModel(servicio,estado)
    {
        try {
            var conn = await connDB().promise()
            var sql = "update reserva_servicio set estado_reserva = "+estado+" where id_reserva_servicio = "+servicio
            console.log(sql)
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
        }
        return false
    }

    static async insertNuevaReservaModel(servicio, usuario, hora_inicio_reserva, hora_fin_reserva,fechaReserva)
    {
        try {
            var conn = await connDB().promise()
            var sql = "insert into reserva_servicio(fk_id_tipo_servicio, fk_email_usuario, " +
                "hora_inicio_reserva, hora_fin_reserva,fechaReserva) VALUES ("+servicio+",'"+usuario+"','"+hora_inicio_reserva+"','"+hora_fin_reserva+"','"+fechaReserva+"')"
            await conn.query(sql)
            await conn.end()
            console.log(sql)
            return true
        }catch (e) {
            console.log(e)
            return false
        }

    }

}

module.exports = ServicioModel
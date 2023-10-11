const connDB = require("../config/conn")
class ReporteModel
{
    static async Report1Model()
    {
        try {
            var conn = await connDB().promise()
            var data = await conn.query("select D.code_departamento,D.fk_sector,TD.detalle_tipo_departamento," +
                "D.actual_usuario_arrendador,U.nombre_usuario,convert(A.fecha_arrendamiento,char(150)) fecha_arrendamiento from departamento as D " +
                "inner join arrendamiento as A on A.fk_code_departamento = D.code_departamento and A.fk_email_usuario = D.actual_usuario_arrendador " +
                "inner join usuario as U on U.email_usuario = D.actual_usuario_arrendador inner join tipo_departamento as TD " +
                "on TD.id_tipo_departamento = D.fk_id_tipo_departamento where D.estado = 2 and ISNULL(A.fecha_desalojo)")
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async Report2Model(fechaI,fechaF)
    {
        try {
            var conn = await connDB().promise()
            var data = await conn.query("select D.code_departamento,D.fk_sector,TD.detalle_tipo_departamento," +
                "D.actual_usuario_arrendador,U.nombre_usuario,convert(date(A.fecha_arrendamiento),char(150)) fecha_arrendamiento," +
                "PD.motivo,PD.estado from departamento as D inner join arrendamiento as A on A.fk_code_departamento = D.code_departamento " +
                "and A.fk_email_usuario = D.actual_usuario_arrendador inner join usuario as U on U.email_usuario = D.actual_usuario_arrendador " +
                "inner join pago_departamento as PD on PD.fk_code_departamento = D.code_departamento and PD.fk_email_usuario = D.actual_usuario_arrendador " +
                "inner join tipo_departamento as TD on TD.id_tipo_departamento = D.fk_id_tipo_departamento where  ISNULL(A.fecha_desalojo) " +
                " and date(fecha_creacion) between '"+fechaI+"' and '"+fechaF+"'")
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async ReporteReservaModel(fechaI,fechaF)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select convert(date(RS.fechaReserva),char(150)) fechaReserva,TS.detalle_servicio,U.nombre_usuario,U.telefono_usuario," +
                "concat(date_format(RS.hora_inicio_reserva,'%H:%m'),' ',date_format(RS.hora_fin_reserva,'%H:%m')) horario," +
                "RS.estado_reserva from reserva_servicio as RS inner join usuario as U on U.email_usuario = RS.fk_email_usuario " +
                "inner join tipo_servicio as TS on TS.id_tipo_servicio = RS.fk_id_tipo_servicio " +
                "where date(RS.fechaReserva) between '"+fechaI+"' and '"+fechaF+"' order by TS.id_tipo_servicio"
            console.log(sql)
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }


    static async ReporteRubroModel(fechaI,fechaF,usuario)
    {
        var sqlUsuario = ""

        if(usuario != "*")
        {
            var user = []

            for(var i = 0;i<usuario.length;i++)
            {
                user.push("'"+usuario[i]+"'")
            }

            sqlUsuario = " and PR.fk_email_usuario in ("+user+")"
        }


        try {
            var conn = await connDB().promise()
            var sql = "select PR.estado,PR.fk_code_departamento,R.detalle_rubro,U.nombre_usuario,U.telefono_usuario,D.fk_sector," +
                "convert(date(PR.fechaAsignacion),char(150)) fechaAsignacion,R.precio_rubro from pago_rubro as PR " +
                "inner join usuario as U on U.email_usuario = PR.fk_email_usuario inner join rubro as R on " +
                "R.id_rubro = PR.fk_id_rubro inner join departamento as D on D.code_departamento = PR.fk_code_departamento " +
                "where PR.estado != 0 and date(PR.fechaAsignacion) between '"+fechaI+"' and '"+fechaF+"' "+sqlUsuario
            console.log(sql)
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }




}

module.exports = ReporteModel
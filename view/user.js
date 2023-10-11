require("../utils/jwt")
const express = require("express")
const app = express()
const UserController = require("../controller/user.controller")
const {createToken, ensureToken} = require("../utils/jwt");
const RolController = require("../controller/rol.controller");

app.post("/login_user",async function(req,res)
{
    try {
        var data = await UserController.loginController(req.body.user,req.body.pass)

        res.status(200).json({
            status_code: data.length > 0 ? 200 : 300,
            msm: data.length > 0 ? 'Credenciales ingresadas con éxito' : 'Credenciales no validas' ,
            token: data.length > 0 ? createToken(data[0].email_usuario,data[0].nombre_usuario,data[0].fk_id_rol) : null
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString(),
        })
    }
})


app.post("/create_user",ensureToken,async function(req,res){
    try {
        var data = await UserController.createUsuarioModel(req.body.email_usuario,
            req.body.contrasenia, req.body.nombre_usuario,
            req.body.telefono_usuario, req.body.dni_usuario, req.body.id_rol,req.body.sexo_usuario)

        res.status(200).json({
            status_code: data ? 200 : 400,
            msm: data ? 'Usuario creado con éxito' : 'No se ha podido crear el usuario'
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString()
        })
    }
})

app.post("/all_user",ensureToken,async function(req,res){
    try {
        var data = await UserController.readAllUsuarioController(req.body.rol)

        res.status(200).json({
            status_code: data.length > 0 ? 200 : 300,
            msm: data.length > 0 ? 'Datos consutados con éxito' : 'No existen datos disponibles' ,
            datos: data
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString(),
            datos:[]
        })
    }
})

app.delete("/delete_user",ensureToken,async function(req,res){
    try {
        var data = await UserController.deleteUsuarioController(req.body.email_usuario)

        res.status(200).json({
            status_code: data ? 200 : 300,
            msm: data ? 'Usuario eliminado con éxito' : 'No se ha podido eliminar el usuario'
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString()
        })
    }
})

app.put("/update_user",ensureToken,async function(req,res){
    try {
        var data = await UserController.updateUsuarioController(req.body.email_usuario, req.body.contrasenia,
            req.body.nombre_usuario, req.body.telefono_usuario, req.body.dni_usuario,
            req.body.fk_id_rol)

        res.status(200).json({
            status_code: data ? 200 : 300,
            msm: data ? 'Usuario actualizado con éxito' : 'No se ha podido actualizar el usuario'
        })

    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm:e.toString()
        })
    }
})

module.exports = app
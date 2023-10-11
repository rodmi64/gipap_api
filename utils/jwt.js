const jwt = require("jsonwebtoken");
let env = require("../config/env")
const JWT_PASS_SECRET = env.JWT_PASS_SECRET
module.exports = {
    ensureToken(req, res, next) {
        const tokenApi =
            req.body.token ||
            req.query.token ||
            req.headers["x-access-token"] ||
            req.params.token;
        if (tokenApi) {
            const jwt = require("jsonwebtoken");
            const jwtdecoded = tokenApi
            jwt.verify(jwtdecoded, JWT_PASS_SECRET, (err, decoded) => {
                if (!err) {
                    req.body.data = decoded;
                    //console.log("token", decoded);
                    return next();
                } else {
                    console.log(err);
                    return res.status(401).json({
                        status_code: 401,
                        msg: "Token no es válido: " + err,
                        data: null,
                    });
                }
            });
        } else {
            return res.status(401).json({
                status_code: 401,
                msg: "Token está vacio",
                data: null,
            });
        }
    },
    createToken(email,nombre_usuario,rol)
    {
        try{
            var token = jwt.sign({
                CodiUsua: email,
                RolUsua: rol,
                NameUsua:nombre_usuario
            },env.JWT_PASS_SECRET,{expiresIn:'24h'})
            return token
        }catch (e) {
            console.log(e)
            return null
        }
    }
}

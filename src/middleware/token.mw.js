const jwt = require("jsonwebtoken");



/*explicacion de como funciona esta verificacion, jsonwebtoken para hacer la firma de verificacion hace un hmac asi hmac = hash(secretkey + hash(secretkey+payload))
osea que si desciframos este token todo lo demas va a ser legible(la cabezera y el payload), pero la firma que es la parte final del token va a estar incriptada
gracias a esos datos, y la funcion verify de jsonwebtoken compara si la firma fue generada a partir del header, payload y secreto, ya que si por ejemplo,
captan/roban algun token y cambian un elemento del payload descifrandolo, cambia algun registro y lo envia, va a surgir un error por que
ese token tenia una forma especifica de ser hecho. mucho textp
*/
const verifyToken = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return console.log("tiene que crearse una cuenta primero");//no debes dar muchas pistas de que paso mal, solo lo suficiente
    }
    jwt.verify(token,"secret",(err,decoded)=>{
        if(err){
            return console.log("some error");
        }
        // console.log("usuario verificado");
        next()
    })
}

const adminVerifyToken = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return console.log("tiene que crearse una cuenta primero");//no debes dar muchas pistas de que paso mal, solo lo suficiente
    }
    jwt.verify(token,"secret",(err,decoded)=>{
        if(err){
            return console.log("some error");
        }
        const rol = decoded.rol;
        if(rol=="admin"){
            // console.log("usuario admin");
            next()
        }
        else{
            return console.log("este usuario no tiene permiso de estar aqui");
        }
        
    })
}


module.exports = { 
    verifyToken,
    adminVerifyToken
}
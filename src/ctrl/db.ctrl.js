const User = require("../models/user");
const bcrypt = require("bcrypt");//more security if someone stole our database
const jwt = require("jsonwebtoken");

const insertUser = async (req,res)=>{
    const {name,email,password,rol} = req.body;

    //encriptamos la password
    const securePassword = await bcrypt.hash(password,8);//1er parametros es textplain password, 2nd number of salt,
    const hashedPass = securePassword;

    //create a new user with the model previews created
    const newUser = await User.create({
        name,
        email,
        password:hashedPass,
        rol
    })//u can use save of mongoose but i prefer use create
    if(!newUser){
        return console.log("some error");//hay un error al crear el usuario
    }
    else{
        res.redirect("/")
        return console.log("user was created");//RECUERDA TU CONTRASEÑA NO PUEDES VERLA EN LA DB/REMEMBER YOUR PASSWORD U CAN'T SEE IT IN DB
       
    }
}

const loginVerify = async (req,res)=>{
    const {LEmail,LPassword}= req.body;
    const user = await User.find({email:LEmail});
    if(user ==""){//primero hacemos una verificacion si el email existe/first we do a verification to know if the email exist
        return console.log("some error");
    }
    else{
        const hashedPass = user[0].password;//obtemos la password si el email existe
        const verify = bcrypt.compareSync(LPassword,hashedPass);//verificamos si la contraseña logeada es la misma que la guardada que es la que fue encriptada
        if(!verify){//si se te olvida las contraseña no vas a poder recuperarla.
            return console.log("algo fue mal");
        }
        else{
            // console.log("las contraseñas son las mismas");
            const payload ={
                name:user[0].name,
                rol:user[0].rol
            }
            //creamos un token para el usuario que ingreso correctamente sesion
            const token = jwt.sign(payload,"secret");//1st para data,objects,arr, 2nd secret YOU MUST NEVER SHOW THE SECRET use dotenv or encrypting, 3th optional option or callback
            res.cookie("token",token);//idk how to use cookies, if you use them, you must know how to make them more efficient
            //pero si esta jwt es robada
            //la unica forma de invalidarla seria cambiar el secreto, por eso nunca dejes el secreto a simple vista, podria perjudicar bastante a todo el programa.
            //nunca dejes datos sensibles en el payload, ya que estos pueden facilmente ser descifrados, ya que lo que lo hace seguro es su firma y no su cifrado
            //la es un hmac gracias a esto sabe si algo fue cambiado
            res.redirect("/allUsers");
            //un problema con la cookie ya que no me manejo bien es que son persistentes, osea que si te sales y vuelves no es necesario volver a iniciar session
            //solo escribiendo la url correcta puede entrar a cualquier url excepto si esta cookie no tiene permiso
        }
    }

   //if hell xd
    
}



module.exports = {
    insertUser,
    loginVerify
}

//I recommend you write here the password and email of the user you are going to use
//admin@gmail.com admin12
//user@gmail.com user12
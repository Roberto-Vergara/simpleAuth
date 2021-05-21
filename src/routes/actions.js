const router = require("express").Router();
const cookieParser = require("cookie-parser");
const dbCtrl = require("../ctrl/db.ctrl");
const mwToken = require("../middleware/token.mw");



router.use(cookieParser())

//create page to crate a new account
router.get("/",(req,res)=>{
    res.clearCookie("token")//idk how to use cookies correctly this was the only idea that occurred to me to erase its persistence
    res.render("entrada");
})

router.get("/allUsers",mwToken.verifyToken,(req,res)=>{
    res.send('<h1>todos los usuarios pueden estar aqui</h1> <a href="/onlyAdmins">admin page</a>')
});

router.get("/onlyAdmins",mwToken.adminVerifyToken,(req,res)=>{
    res.send("solo los admin estan aqui")
})


router.post("/insert",dbCtrl.insertUser);

router.post("/login",dbCtrl.loginVerify)

module.exports = router;
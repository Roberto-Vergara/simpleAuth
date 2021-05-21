const  express = require("express");
const app = express();
const con=  require("./db");//waiting db

const dir = __dirname;

//utiles
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${dir}/public`))


app.set("port",process.env.PORT || 3000);
app.set('views', `${dir}/views`);
app.set('view engine', 'ejs');


app.use("/", require("./routes/actions"))





module.exports = app;


//in this case i'll use jwt, but i think than i will use cookies in another proyect

//no se cual mejor, pero creo que lo mas recomendable es usar cookies ya que se tiene bastante conocimiento sobre estas
//SI TU CREAS UNA WEB NO DEBES DE DAR TANTAS PISTAS DE QUE SALIO MAL, SOLO LO NECESARIO, SI SUBES UNA WEB YA DEBERIAN ESTAR VISTOS TODOS ESO ERRORES BASICOS
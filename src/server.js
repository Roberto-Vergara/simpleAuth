const server = require("./app");

server.listen(server.get("port"),()=>{
    console.log(server.get("port"));
})
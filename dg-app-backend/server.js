const express = require("express");
const app = express();
const port = 5000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connection = require("./database/connection");
const User = require("./database/user");
const cors = require("cors");

//database
connection
    .authenticate()
    .then(() => {
        console.log("conexão com database sucesso!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/users", (req, res) => {    
    User.findAll({raw:true}).then( Users => {
      res.json(Users)
    })
});

//rota para cadastrar usuário
app.post("/cadastrar", (req, res) => {
    let userReq = req.body;
    let name = req.body.fullName;
    let dateBirth = req.body.dateBirthday;
    let age = req.body.age;

    const new_user = {
        name,
        dateBirth,
        age,
    };

    if (!userReq) {
        console.log("error");
    } else {
        User.create({
            name: new_user.name,
            birthday: new_user.dateBirth,
            age: new_user.age,
        }).then(() => {
            res.json({ msg: "Informação registrada com sucesso!" });
        });
    }
});

app.listen(port, (error) => {
    if (error) {
        console.log("Erro ao rodar aplicação!");
    } else {
        console.log("Aplicação rodando na URL: http://localhost:5000");
    }
});

const Sequelize = require("sequelize")
const connection = require("./connection")

//codigo para criar tabela dentro do BD - nome da tabela 'Postagem'
const User = connection.define("Users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthday: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    age: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

User.sync({force: false}).then(()=>{
    console.log('tabela criada!')
})

module.exports = User

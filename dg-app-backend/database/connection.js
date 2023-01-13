const Sequelize = require("sequelize")
const connection = new Sequelize(
    "dbDG",
    "root",
    "XXXXXX",
    {host: "localhost", port: "3307", dialect: "mysql"}
)

module.exports = connection

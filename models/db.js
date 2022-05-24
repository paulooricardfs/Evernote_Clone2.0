const Sequelize = require('sequelize')
// Conexão com o banco de dados MySql
  const sequelize = new Sequelize('mydatabase', 'novousuario', 'P@ssw0rd', {
		host: "127.0.0.1",
		dialect: 'mysql'
	})

module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize
}
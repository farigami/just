const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define( 'user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    is_admin: {type: DataTypes.BOOLEAN, defaultValue: false}
})




module.exports = {
    User
}
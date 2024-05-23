const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const {Product} = require('./product-model')

const Order = sequelize.define( 'order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firts_name: {type: DataTypes.STRING},
    telephone: {type: DataTypes.TEXT},
    total_price: {type: DataTypes.INTEGER}
})

const OrderProduct = sequelize.define( 'order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER}
})


Order.hasOne(OrderProduct) //Заказ
OrderProduct.belongsTo(Order)

Product.hasOne(OrderProduct) //Продукт
OrderProduct.belongsTo(Product)

module.exports = {
    Order,
    OrderProduct
}
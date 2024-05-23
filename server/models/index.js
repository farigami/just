const User = require('./user-model')
const {Product, Category} = require('./product-model')
const {Order, OrderProduct} = require('./order-model')
module.exports = {
    User,
    Product,
    OrderProduct,
    Order,
    Category,
}
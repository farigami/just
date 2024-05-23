const { Order, OrderProduct } = require('../models/order-model')

const { Product } = require('../models/product-model')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize')
const { or } = require('../db')
class OrderController {
    async create(req, res, next) {
        const { name, telephone, products } = req.body
        console.log(products)
        if (!name || !telephone) {
            return next(ApiError.badRequest('Заполните все поля'))
        }
        const total_price = products.reduce((acc, item) => acc += item.price * item.quantity, 0)
        const order = await Order.create({
            firts_name: name,
            telephone: telephone,
            total_price: total_price
        })
        products.map(async (product) => {
            await OrderProduct.create({
                orderId: order.id,
                productId: product.id,
                quantity: product.quantity
            })
        })
        return res.json({ message: 'Заказ создан' })

    }
    async get_all(req, res, next) {
        const orders = await Order.findAll()
        return res.json(orders)
    }

    async get(req, res, next) {
        const { id } = req.params
        let data = []
        const order_products = await OrderProduct.findAll({where: {orderId: parseInt(id)}})
        order_products.map(async (order_product, index) => {
            Product.findOne({where: {id: order_product.productId}}).then(product => {
                data = [...data, { ...product.dataValues, quantity: order_product.quantity}]
                if(index + 1 === order_products.length){return res.json(data)}
            })
        })
      
       
    }
}

module.exports = new OrderController()

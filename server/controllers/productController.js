const {Product} = require('../models/product-model')
const uuid = require('uuid')
const path = require('path')
const { Op } = require('sequelize')
const ApiError = require('../error/ApiError')
class ProductController {
    async create(req, res, next) {
        try {
            const {title, description, old_price, price,  categoryId, amount, hit, sale} = req.body
            const {image} = req.files
            let fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({
                title: title, 
                image: fileName,
                description: description, 
                end_date: Date.now(), 
                create_date: Date.now(), 
                refresh_date: Date.now(),
                old_price: old_price,
                price: price,
                categoryId: categoryId,
                amount: amount,
                hit: hit, 
                sale: sale
            })
            return res.json(product)
        } catch (e) {
            next()
        }
    }
    async get(req, res, next) {
        const {slug} = req.params
        console.log(slug)
        if (slug){
            const product = await Product.findOne({where: {slug}})
            return res.json(product)
        }
        return next(ApiError.internal('Params error'))
        
    }

    async get_all(req, res, next) {
        const products = await Product.findAll()
        return res.json(products)
    }
   
}


module.exports = new ProductController()
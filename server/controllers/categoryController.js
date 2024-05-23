const { Category, Product }  = require('../models/product-model')
const { Op } = require('sequelize')
class CategoryController {
    async create(req, res, next) {
        
        try {
            const { title } = req.body
            console.log(title)
            const category = await Category.create({
                title: title,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            })
            return res.json(category)
        } catch (e) {
            next()
        }
    }

    async get_all(req, res, next) {
        try{
            const category = await Category.findAll()
            return res.json(category)
        }catch(e){
            next(e)
        }
    }

    async get(req, res, next) {
        console.log(req.params)
        try{
            const {slug} = req.params
            const category = await Category.findOne({where: {slug}})
            const products = await Product.findAll({where: {categoryId: category.id}})
            return res.json(products)
        }catch(e){
            next(e)
        }
    }

}


module.exports = new CategoryController()
const Router = require('express')
const router = new Router()

const ProductController = require('../controllers/productController')
const CategoryController = require('../controllers/categoryController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')



router.get('/all', ProductController.get_all)
router.get('/find/:slug', ProductController.get)
router.post('/create', ProductController.create)
router.get('/category', CategoryController.get_all)
router.get('/category/:slug', CategoryController.get)
router.post('/category/create', checkRole(), CategoryController.create)

module.exports = router
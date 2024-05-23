const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/orderController')
const checkRole = require('../middleware/roleMiddleware')
router.post('/create', OrderController.create)
router.get('/all', OrderController.get_all)
router.get('/get/:id', OrderController.get)
module.exports = router
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/user-model')

const generateJwt = async (id, login, is_admin) => {
    return jwt.sign(
        {id, login, is_admin}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {login, first_name, last_name, password} = req.body
        if (!login || !password || !first_name || !last_name ) {
            return next(ApiError.badRequest('Некорректные данные'))
        }
        const candidate = await User.findOne({where: {login}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким логином уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, first_name, last_name, password:hashPassword})
        const token = await generateJwt(user.id, user.login, user.is_admin)
        return res.json({token})
    }

    async login(req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = await generateJwt(user.id, user.login, user.is_admin)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = await generateJwt(req.user.id, req.user.login, req.user.is_admin)
        return res.json({token})
    }
}

module.exports = new UserController()
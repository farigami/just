const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const slugify = require('slugify')

const Product = sequelize.define( 'product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.STRING, defaultValue: '/no-image.png', allowNull: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    end_date: {type: DataTypes.DATE},
    create_date: {type: DataTypes.DATE},
    refresh_date: {type: DataTypes.DATE},
    price: {type: DataTypes.FLOAT},
    old_price: {type: DataTypes.FLOAT, allowNull: true, defaultValue: 0},
    amount: {type: DataTypes.INTEGER, defaultValue: 0},
    hit: {type: DataTypes.BOOLEAN, defaultValue: false},
    sale: {type: DataTypes.BOOLEAN, defaultValue: false},
    slug: { type: DataTypes.STRING, allowNull: true },
})

Product.beforeCreate(product => {
    product.slug = slugify(product.title)
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    slug: { type: DataTypes.STRING, allowNull: true },
})

Category.beforeCreate(async (category) => {
    category.slug = slugify(category.title)
})


Category.hasOne(Product) //Категория
Product.belongsTo(Category)

module.exports = {
    Product,
    Category
}
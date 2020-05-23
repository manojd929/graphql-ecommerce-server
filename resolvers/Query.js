const db = require('../database')

const getProductsList = (parent, args, context) => {
    let productsList = db.products.list()
    return productsList
}

const getProductDetails = (parent, args, context) => {
    const product = db.products.get(args.id)
    return product
}

const getBrandsList = (parent, args, context) => {
    const brands = db.brands.list()
    return brands
}

const getBrandDetails = (parent, args, context) => {
    const brand = db.brands.get(args.id)
    return brand
}

module.exports = {
    getProductsList,
    getProductDetails,
    getBrandsList,
    getBrandDetails
}
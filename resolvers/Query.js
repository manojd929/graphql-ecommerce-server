const db = require('../database')

const getProductsList = (parent, args, context) => {
    
    let productsList = db.products.list()
    return productsList
}

const getProductDetails = (parent, args, context) => {
    let product = db.products.get(args.id)
    return product
}

const getBrandsList = (parent, args, context) => {
    let brandsList = db.brands.list()
    return brandsList
}

const getBrandDetails = (parent, args, context) => {
    let brandDetails = db.brands.get(args.id)
    return brandDetails
}

module.exports = {
    getProductsList,
    getProductDetails,
    getBrandsList,
    getBrandDetails
}
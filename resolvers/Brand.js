const db = require('../database')

const productsList = (parent, args, context) => {
    const brandId = parent.id
    const allProducts = db.products.list()
    const productsList = allProducts.filter((product) => product.brandId === brandId)
    return productsList
}

module.exports = {
    productsList
}
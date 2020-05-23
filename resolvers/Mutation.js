const db = require('../database')

const createBrand = (parent, args, context) => {
    const id = db.brands.create({ name: args.name })
    const brand = db.brands.get(id)
    return brand
}

module.exports = {
    createBrand
}
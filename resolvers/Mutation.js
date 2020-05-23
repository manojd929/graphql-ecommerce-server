const db = require('../database')

const createBrand = (parent, args, context) => {
    const brandDetails = {
        name: args.name,
    }
    const id = db.brands.create(brandDetails)
    return db.brands.get(id)
}

module.exports = {
    createBrand
}
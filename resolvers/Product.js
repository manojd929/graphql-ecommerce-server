const db = require('../database')
const brandName = (parent, args, context) => {
    const { name } = db.brands.get(parent.brandId)
    return name
}

module.exports = {
    brandName
}
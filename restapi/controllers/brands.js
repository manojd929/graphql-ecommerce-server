const db = require('../database')

const getBrandsList = (req) => {
    try {
        let items = db.brands.list()
        const sortParameter = req.query.sort
        if (sortParameter === name) {
            items.sort((a, b) => a.name - b.name)
        }
        return items
    } catch (err) {
        return getErrorMessage(err.message)
    }
}

const getBrandDetails = (req) => {
    try {
        const brandId = req.params.id
        let brandDetails = db.brands.get(brandId)
        if (!brandDetails) {
            throw new Error('Brand not found')
        }
        return brandDetails
    } catch (err) {
        return getErrorMessage(err.message)
    }
}

module.exports = {
    getBrandsList,
    getBrandDetails
}  

const db = require('../database')
const getErrorMessage = require('../utils/getErrorMessage')

const supportedSortParameters = ['price', 'availability', 'name']

const getProductsList = (req) => {
    try {
        let items = db.products.list()
        items = items.map(item => {
            item.brandName = db.brands.get(item.brandId).name
            return item
        })

        // Handle filters
        if (req.query.brand) {
            items = items.filter(item => {
                return item.brandName === req.query.brand
            })
        }

        // Handle Sorting
        const sortParameter = req.query.sort
        if (sortParameter && supportedSortParameters.includes(sortParameter)) {
            items.sort((itemA, itemB) => {
                if (sortParameter === 'price') {
                    return itemA.price.value - itemB.price.value
                }
                if  (sortParameter === 'name') {
                    if (itemA.name.toUpperCase() < itemB.name.toUpperCase()) {
                        return -1;
                    }
                    if (itemA.name.toUpperCase() > itemB.name.toUpperCase()) {
                        return 1;
                    }
                    return 0
                }
                return itemA[sortParameter] - itemB[sortParameter]
            })
        }

        return items
    } catch (err) {
        return getErrorMessage(err.message)
    }
}

const getProductDetails = (req) => {
    try {
        const productId = req.params.id
        const productDetails = db.products.get(productId)
        if (!productDetails) {
            throw new Error('Product not found')
        }
        let brandDetails = db.brands.list(productDetails.brandId)
        productDetails.brandName = brandDetails ? brandDetails.name : null
        return productDetails
    } catch (err) {
        return getErrorMessage(err.message)
    }
}

module.exports = {
    getProductsList,
    getProductDetails
}
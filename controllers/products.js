const db = require('../database')
const getErrorMessage = require('../utils/getErrorMessage')

const supportedSortParameters = ['price', 'availability', 'name']

const getProductsList = (req) => {
    try {
        let items = db.products.list()
        // Handle Filters
        if (req.query.brand) {
            const brandsList = db.brands.list()
            const brandDetails = brandsList.filter((brand) => brand.name === req.query.brand)[0]
            if (!brandDetails) {
                throw new Error('No product with the specified brand are available')
            }
            items = items.filter(item => {
                console.log(item.brandId, brandDetails.id)
                return item.brandId === brandDetails.id
            })
        }

        // Handle sorting
        const sortParameter = req.query.sort
        if (sortParameter && supportedSortParameters.includes(sortParameter)) {
            items.sort((a, b) => {
                if (sortParameter === 'price') {
                    return a.price.value - b.price.value
                }
                return a[sortParameter] - b[sortParameter]
            });
        }
        return items
    } catch (err) {
        return getErrorMessage(err.message)
    }
}

const getProductDetails = (req) => {
    try {
        const productId = req.params.id
        let productDetails = db.products.get(productId)
        if (!productDetails) {
            throw new Error('Product details not found')
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

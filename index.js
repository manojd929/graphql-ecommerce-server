const express = require('express')
const productsController = require('./controllers/products')
const brandsController = require('./controllers/brands')

const app = express()

app.get('/products', (req, res) => {
    const productList = productsController.getProductsList(req)
    res.send(productList)
})

app.get('/products/:id', (req, res) => {
    const productDetails = productsController.getProductDetails(req)
    res.send(productDetails)
})

app.get('/brands', (req, res) => {
    const brandsList = brandsController.getBrandsList(req)
    res.send(brandsList)
})

app.get('/brands/:id', (req, res) => {
    const brandDetails = brandsController.getBrandDetails(req)
    res.send(brandDetails)
})

app.listen(9998, () => {
    console.log('Server listenting successfully at 9998')
}) 

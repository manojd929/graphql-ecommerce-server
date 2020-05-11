const express = require('express');
const { products, brands } = require('./database');
const PORT = 9999;

const app = express();

app.get('/brands', (req, res) => {
    res.send(brands.list())
})

app.get('/products', (req, res) => {
    const list = products.list();
    const modifiedProducts = list.map(product => {
        product.brandName = brands.get(product.brandId).name
        return product
    });
    res.send(modifiedProducts)
})

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    res.send(products.get(productId));
})

app.get('/brands/:id', (req, res) => {
    const brandId = req.params.id;
    res.send(brands.get(brandId))
})

app.listen(PORT, () => {
    console.log('Server listening at PORT: ', PORT);
});

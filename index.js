const express = require('express');
const db = require('./database');
const app = express();

app.get('/products', (req, res) => {
    const productList = db.products.list();
    const modifiedProducctList = productList.map(product => {
        product.brand = db.brands.get(product.brandId).name;
        return product
    })
    res.send(modifiedProducctList);
});

app.get('/products/:id', (req, res) => {
    let product = db.products.get(req.params.id);
    product.brand = db.brands.get(product.brandId).name;
    res.send(product);
});

app.get('/brands', (req, res) => {
    res.send(db.brands.list());
});

app.get('/brands/:id', (req, res) => {
    res.send(db.brands.get(req.params.id));
});

app.listen(9998, () => {
    console.log('Server listenting successfully at 9998');
});


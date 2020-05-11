const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
    products: store.collection('products'),
    brands: store.collection('brands'),
};

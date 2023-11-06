import express from 'express';
import { ProductManager } from './ProductManager.js';

const app = express();
const port = 3000;

const manager = new ProductManager('productos.json');

app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    const products = await manager.getProducts();

    if (limit) {
        res.json(products.slice(0, limit));
    } else {
        res.json(products);
    }
});


app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = await manager.getProductById(productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'No se encontro el producto' });
    }
});

app.listen(port, () => {
    console.log(`Servidor funcionando en http://localhost:${port}`);
});
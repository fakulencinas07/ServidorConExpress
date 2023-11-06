import fs from 'fs';

class ProductManager {gi
    constructor(path) {
        this.path = path;
    }

    addProduct(product) {
        const products = this.getProducts();
        const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        product.id = id;
        products.push(product);
        this.saveProducts(products);
        return product;
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        return products.find(product => product.id === id);
    }

    updateProduct(id, updatedProduct) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            updatedProduct.id = id;
            products[index] = updatedProduct;
            this.saveProducts(products);
            return updatedProduct;
        }
        return null;
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const updatedProducts = products.filter(product => product.id !== id);
        this.saveProducts(updatedProducts);
    }

    saveProducts(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf8');
    }
}

// para comprobar que funciona 


const manager = new ProductManager('productos.json');

manager.addProduct({
    title: 'GatiBaño',
    description: 'Cucha con arenero',
    price: 15000,
    thumbnail: 'foto.jpg',
    code: '234',
    stock: 11
});

console.log(manager.getProducts());

const updatedProduct = manager.updateProduct(1, {
    title: 'GatiBaño (Actualizado)',
    description: 'Nueva descripción de la Cucha',
    price: 18000,
    thumbnail: 'foto.jpg',
    code: '234',
    stock: 15
});

console.log(updatedProduct);

manager.deleteProduct(1);

console.log(manager.getProducts());

export { ProductManager };
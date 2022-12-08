import fs from 'fs'
import { NotFoundError, ValidationError } from '../utils/index.js';

export class ProductManagerFilesystem {
    constructor(path){
        this.path= path;

        this.#init()

    }
    
    #init () {
        try {

            const existFile = fs.existsSync(this.path);

            if(existFile)return;

            fs.writeFileSync(this.path, JSON.stringify([]));

        } catch (error){
           console.log(error);
        }
    }

    #writeFile(data) {
        return fs.promises.writeFile(this.path, JSON.stringify(data, null, 3))
    }

    async getProducts () {
        const response = await fs.promises.readFile(this.path, 'utf-8');

        return JSON.parse(response);
    }

    async getProductById (id) {
        const products = await this.getProducts();

        const productFound = products.find(product => product.id === id) ;

        return productFound;
    }

    async saveProduct ({title, description, price, code}){
        const newProduct = {title, description, price, code}

        const products = await this.getProducts()

        const existCodeInProducts = products.some(
            (product) => product.code === code
          );

        if (existCodeInProducts) {
            throw new ValidationError ("El codigo no se puede repetir")
        }


        newProduct.id = !products.length ? 1 : products[products.length -1].id + 1

        products.push(newProduct)

        //await fs.promises.writeFile(this.path, JSON.stringify(products, null,3))
        await this.#writeFile(products)
        return newProduct
    }

    //async update(id, {title, description, price, code}){
    async update(id, newData){
        const products = await this.getProducts()

        const productIndex = products.findIndex( product => product.id === id)

        if (productIndex === -1){
            throw new NotFoundError("Producto no fue encontrado")
        }

        const product = products[productIndex]

        products [productIndex] = {...product, ...newData}

        //await fs.promises.writeFile(this.path, JSON.stringify(products, null, 3))
        await this.#writeFile(products)
        return products [productIndex]
    }

}
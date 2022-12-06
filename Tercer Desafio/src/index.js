import express from "express";

import { productManager } from './Managers/index.js';

const app = express ();

const PORT = 8080;


app.get('/api/products', async (req, res) => {
try{
    const {limit} = req.query;

    
    const allProducts = await productManager.getProducts();

    if(!limit  || limit < 1) {
        return res.send ({succes: true, products: allProducts});
    }
    const products = allProducts.slice(0, limit)

    res.send ({succes: true, products});
} catch (console) {
    console.log(console)

    res.send({succes: false, error: "Ha ocurrido un error"})
}    
});


app.get('/api/products/id', async (req, res) => {
    try{

        const {id: pramId} = req.params;

        const id = Number(paramId)

        if( id < 0 ) {
            return res.send({succes: false, error:"El id debe ser un numero valido "})
        }
        
        const product = await productManager.getProductById(id)

        if(!product){
            return res.send({succes: false, error:"El producto no fue encontrado "})
        }

        res.send({succes:true, product: product})


    }catch (error ) {

        console.log(error)

        res.send({succes: false, error: "Ha ocurrido un error"})

    }
} )

app.listen (PORT, () => console.log(`Server running on port ${PORT}`));




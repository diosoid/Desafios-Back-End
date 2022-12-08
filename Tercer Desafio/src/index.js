import express from "express";
import { ERRORS } from "./consts/index.js";


import { productManager } from './Managers/index.js';

const app = express ();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

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


app.get('/api/products/:id', async (req, res) => {
    try{

        const {id: paramId} = req.params;

        const id = Number(paramId)

        if(Number.isNaN(id)  || id < 0 ) {
            return res.send({
            succes: false,
            error:"El id debe ser un numero valido "
          })
        }       
        const product = await productManager.getProductById(id);

        if(!product){
            return res.send({succes: false, error:"El producto no fue encontrado "});
        }
        res.send({succes:true, product: product})


    }catch (error ) {
        console.log(error)
        res.send({succes: false, error: "Ha ocurrido un error"})
    } 

} );


 app.post ('/api/products', async (req, res) => {
    try {

        //MESSAGES.BIENVENIDO
        //ERRORS.VALIDATION_ERROR

        const {title, description, price, code} = req.body;

        if(!title || !description || !price || !code ){
            return res.send({           
                succes: false,
                error: "Las variables son boligatorias",
            })
        }

        const savedProduct = await productManager.saveProduct({
            title,
            description,
            price,
            code,
        })

        res.send({succes: true, product: savedProduct})
    } catch (error) {
        console.log(error);

        if(error.name === ERRORS.VALIDATION_ERROR){
            return res.send ({
                succes: false,
                error: `${error.name}  ${error.message}`
            })
        } 

        res.send({succes: false, error: "Ha ocurrido un error"})
    }
 })

 app.put('/api/products/:id', async(req, res) => {
    try {
        const {id: paramId} = req.params;

        const id = Number(paramId)

        if(Number.isNaN(id)  || id < 0 ) {
            return res.send({
            succes: false,
            error:"El id debe ser un numero valido "
          })
        }

          const {title, description, price, code} = req.body;

          const updatedProduct = await productManager.update(id, {
            title,
            description,
            price,
            code,
        })

          res.send({succes:true, product: updatedProduct})
           
    } catch (error) {

        console.log(error)

        if(error.name === ERRORS.NOT_FOUND_ERROR) {
            return res.send({ succes: false, error: `${error.name}: ${error.message} `})
        }
        res.send({succes: false, error: "Ha ocurrido un error"})        
    }
 })


app.listen (PORT, () => console.log(`Server running on port ${PORT}`));




const express = require ('express')
const ProductManager = require('./productManager')



const app = express()
const manager = new ProductManager('productos.json')

app.get('/',  async (req,res) => {
    
    const products = await manager.getProducts()

    res.json(products)

})

app.get('/add',  async (req,res) => {

    const body = req.query 
    const obj = await manager.addProduct(body)
    
    

    res.json(obj)

})






app.listen (8080)
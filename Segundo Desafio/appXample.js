const ProductManager = require('./productManager')

const manager = new ProductManager('products.json');

(async () => {
   await manager.addProduct({
        title:"GeForce GTX 1080",
        description:    "Para que tus juegos cobren vida",
        price:    300000,
        thumbnail:    "https://http2.mlstatic.com/D_NQ_NP_776262-MLA51258284148_082022-W.jpg",
        stock:    10,
        code:    322
    })

    
    console.log( await manager.getProducts());
    
    
    await manager.updateProduct(2, {
        title:"GeForce GTX 1080",
        description:    "Para que tus juegos cobren vida",
        price:    200,
        thumbnail:    "https://http2.mlstatic.com/D_NQ_NP_776262-MLA51258284148_082022-W.jpg",
        stock:    10,
        code:    322
    })

    
    await manager.updateProductIdx(2, {
        title:"GeForce GTX 1080",
        description:    "Para que tus juegos cobren vida",
        price:    1500,
        thumbnail:    "https://http2.mlstatic.com/D_NQ_NP_776262-MLA51258284148_082022-W.jpg",
        stock:    10,
        code:    322
    })

    await manager.updateProductIdx(4, {
        title:"T-FORDE 32 GB RAM",
        description:    "Para que tus juegos cobren vida",
        price:    1500,
        thumbnail:    "https://http2.mlstatic.com/D_NQ_NP_776262-MLA51258284148_082022-W.jpg",
        stock:    10,
        code:    322
    })

    console.log( await manager.getProducts());
    

    await manager.deleteProduct(1)

    console.log( await manager.getProducts());

    await manager.getProductByID(1)

    
}) ()
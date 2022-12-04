class ProductManager {   
    constructor (products) {
        this.products = products;
    }    
    addProduct = (title, description, price, thumbnail, code, stock) => {
        if ((title, description, price, thumbnail, code, stock)){
            const checkCode = this.products.find ((e) => e.code == code)
            if (checkCode) {
                console.log("El articulo ya fue ingresado, por favor ingrese un producto diferente")
            } else {
                if (this.products.length > 0) {
                    const productId = this.products[this.products.length -1].id +1;
                    const newProduct = {
                        id: productId,
                        title,
                        description,
                        price,
                        thumbnail,
                        stock,
                        code
                    };
                    
                    this.products.push(newProduct)
                } else {
                    const newProduct = {
                        
                        id: 1,
                        title,
                        description,
                        price,
                        thumbnail,
                        stock,
                        code
                        
                    };
                    
                    this.products.push(newProduct)
                }               
            }
        }else{
            console.log("Por favor complete la informacion requerida.")
        }
    };    
    
    
    getProduct = () => {
        if (this.products.length > 0) {
            console.log(this.products)
        }else {
            console.log (`El producto no existe`)
        }
    }
    getProductById = (id) => {
        
        if ( this.products.length > 0 ) {
            const verProductos = this.products.find((product) => product.id == id);
            verProductos ? console.log(verProductos) : console.log("Not found")
        }else {
            console.log("Producto inexistente")
        }
        
    };
}

let productos = [] 
const products = new ProductManager(productos)


products.addProduct(
    "GeForce GTX 1080",
    "Para que tus juegos cobren vida",
    300000,
    "https://http2.mlstatic.com/D_NQ_NP_776262-MLA51258284148_082022-W.jpg",
    10,
    322
    )
products.addProduct(
        "T-Force 16 GB Ram ddr4",
    "A toda velocidad",
    30000,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShstXvpmDPGarDjMJUJT0YxrYYY5O6SYKDtQ&usqp=CAU",
    12,
    326
    )


products.getProduct();


products.getProductById(3);



    



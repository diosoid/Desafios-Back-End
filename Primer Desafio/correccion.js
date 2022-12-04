const fs = require('fs')

class ProductManager {
    // Podriamos iniciar con un array  vacio, sin la necesidad de obtener por parametro
    constructor() {
      this.products = [];
    }
  
    // podemos resumir un poco la funcion a algo como
    addProduct = (title, description, price, thumbnail, code, stock) => {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        // deberiamos ir retornando, no mostrar un console log acá, o cuanto mucho ambos
        // hay muchas formas de manejar la respuesta cuando algo es erroneo, por ahora mandamos un string
        return "Por favor complete la informacion requerida.";
      }
  
      const checkCode = this.products.find((e) => e.code == code);
      if (checkCode) {
        return "El articulo ya fue ingresado, por favor ingrese un producto diferente";
      }
  
      // obtener el id, varias formas, dos de ellas:
      // let id;
      // if(this.products.length > 0) {
      //     id =this.products[this.products.length - 1].id + 1;
      // } else {
      //     id = 1
      // }
  
      // otra forma, usando un template string, es como un if resumido en una linea: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
      const productId =
        this.products.length > 0
          ? this.products[this.products.length - 1].id + 1
          : 1;
      const newProduct = {
        id: productId,
        title,
        description,
        price,
        thumbnail,
        stock,
        code,
      };
  
      this.products.push(newProduct);
  
      // y podriamos retornar el producto creado
      return newProduct;
    };
  
    //   addProduct = (title, description, price, thumbnail, code, stock) => {
    //     if ((title, description, price, thumbnail, code, stock)) {
    //       const checkCode = this.products.find((e) => e.code == code);
    //       if (checkCode) {
    //         console.log(
    //           "El articulo ya fue ingresado, por favor ingrese un producto diferente"
    //         );
    //       } else {
    //         if (this.products.length > 0) {
    //           const productId = this.products[this.products.length - 1].id + 1;
    //           const newProduct = {
    //             id: productId,
    //             title,
    //             description,
    //             price,
    //             thumbnail,
    //             stock,
    //             code,
    //           };
  
    //           this.products.push(newProduct);
    //         } else {
    //           const newProduct = {
    //             id: 1,
    //             title,
    //             description,
    //             price,
    //             thumbnail,
    //             stock,
    //             code,
    //           };
  
    //           this.products.push(newProduct);
    //         }
    //       }
    //     } else {
    //       console.log("Por favor complete la informacion requerida.");
    //     }
    //   };
  
    getProduct = () => {
      // falta retornar
      if (this.products.length > 0) {
        //   console.log(this.products);
        return this.products;
      } else {
        console.log(`El producto no existe`);
      }
    };
    getProductById = (id) => {
      // if (this.products.length > 0) {
      //   const verProductos = this.products.find((product) => product.id == id);
      // //   verProductos ? console.log(verProductos) : console.log("Not found");
      // } else {
      //   console.log("Producto inexistente");
      // }
      const product = this.products.find((product) => product.id == id);
      if (product) {
        return product;
      }
      console.log("Not found");
    };
  }
  
  let productos = [];
  const products = new ProductManager(productos);
  
  products.addProduct(
    "GeForce GTX 1080",
    "Para que tus juegos cobren vida",
    300000,
    "https://http2.mlstatic.com/D_NQ_NP_776262-MLA51258284148_082022-W.jpg",
    10,
    322
  );
  products.addProduct(
    "T-Force 16 GB Ram ddr4",
    "A toda velocidad",
    30000,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShstXvpmDPGarDjMJUJT0YxrYYY5O6SYKDtQ&usqp=CAU",
    12,
    326
  );

  
  

const DB = product.getProducts();

const jsonStr = JSON.stringify(DB)
fs.promises.writeFile('DB.json', jsonStr)
    .then(() => {
        console.log('DB saved!');
    })
    .catch(e => {
        console.error('ERROR', e);
    })

console.log(jsonStr);

  
  // ahora aca podriamos meter esto en un console log o el valor de retorno a una variable
  // console.log(products.getProduct())
  const allProducts = products.getProduct();
  console.log(allProducts);
  
  products.getProductById(3);
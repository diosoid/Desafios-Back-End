const fs = require('fs')

class ProductManager {

    constructor(path) {
        this.path = path
    }

    read =  () => {
        if (fs.existsSync(this.path)){
            return fs.promises.readFile(this.path, "utf-8").then (result => JSON.parse(result))            
        }
        return []
    }

    getNextID = list => {
        const count = list.length
        return (count > 0) ? list[count - 1].id +1 :1
    }


    write =  list  => {
        return fs.promises.writeFile(this.path, JSON.stringify(list))
    }

    getProducts = async () => {
        const data = await  this.read()
        return data
    }

    addProduct = async (obj) =>{
        const list = await this.read()
        const nextID = this.getNextID(list)
        obj.id = nextID

        list.push(obj)
        await this.write(list)

        return obj

    }

    getProductById = async (id) => {
        const list = await this.read()
        const idx = list.find(e => e.id == id)

        idx
        ? console.log(idx)
        : console.log("El producto seleccionado no se encontro.") 
        
    }

    updateProduct = async (id, obj) => {
        obj.id = id
        const list = await this.read()

        for (let i = 0; i < list.length; i++){
            if(list[i].id == id){
                list[i] = obj
                break
            }x
        }

        await this.write(list)
    }

    updateProductIdx = async (id, obj) => {
        obj.id = id
        const list = await this.read()

        const idx = list.findIndex(e => e.id == id)
        if (idx < 0) return

        list[idx] = obj 
        

        await this.write(list)
    }

    deleteProd = async (id) => {
        const list = await this.read()
        const idx = list.findIndex(prod => prod.id == id)

        if (idx >= 0) {
            list.splice(idx, 1)
        } else {
            console.log("El producto seleccionado no existe")
        }

        await this.write(list)
    }


}

module.exports = ProductManager
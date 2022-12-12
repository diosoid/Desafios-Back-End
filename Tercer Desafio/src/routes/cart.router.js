import {Router} from 'express'

const router = Router()
const carts = []

router.get('/', (req, res) => {
    res.json({carts})
})

router.post('/', (req, res) => {
    const cart = req.body
    carts.push(cart)

    res.json({status: "success"})
})


export default router
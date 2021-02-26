'use strict'
// require the Express module
const express = require('express')
// Creates an new router object
const routes = express.Router()

const cartItems = [
  { id: 1, product: 'shoes', price: 40, quanity: 1 },
  { id: 2, product: 'bread', price: 3, quanity: 2 },
  { id: 3, product: 'milk', price: 5, quanity: 3 },
  { id: 5, product: 'tv', price: 500, quanity: 1 },
  { id: 6, product: 'tv', price: 500, quanity: 1 },
  { id: 7, product: 'tv', price: 500, quanity: 1 },
  { id: 8, product: 'tv', price: 500, quanity: 1 },
  { id: 9, product: 'tv', price: 500, quanity: 1 },
  { id: 10, product: 'tv', price: 500, quanity: 1 },
  { id: 11, product: 'tv', price: 500, quanity: 1 },
  { id: 12, product: 'tv', price: 500, quanity: 1 },
  { id: 13, product: 'tv', price: 500, quanity: 1 },
  { id: 14, product: 'tv', price: 500, quanity: 1 },
]
let nextId = 5

routes.get('/cart-items', (req, res) => {
  let filteredCart = cartItems
  let maxPrice = req.query.maxPrice
  let prefix = req.query.prefix
  let pageSize = req.query.pageSize

  if (maxPrice) {
    filteredCart = filteredCart.filter((item) => {
      return item.price <= parseInt(maxPrice)
    })
  }
  if (prefix) {
    filteredCart = filteredCart.filter((item) => {
      return item.product.toLowerCase().startsWith(prefix.toLowerCase().trim())
    })
  }
  if (pageSize) {
    filteredCart = filteredCart.slice(0, pageSize)
  }
  res.json(filteredCart)
  res.status(200)
})

routes.get('/cart-items/:id', (req, res) => {
  let id = parseInt(req.params.id)
  let foundProduct = cartItems.find((item) => {
    return item.id === id
  })
  if (foundProduct) {
    res.json(foundProduct)
  } else {
    res.send(`No product with id: ${id}`)
  }
})
routes.post('/cart-items', (req, res) => {
  let product = req.body
  product.id = nextId++
  cartItems.push(product)
  res.status(201)
  res.json(product)
})

routes.put('/cart-items/:id', (req, res) => {
  let id = parseInt(req.params.id)
  let updatedProduct = req.body
  updatedProduct.id = id
  let index = cartItems.findIndex((item) => {
    return item.id === id
  })
  if (index === -1) {
    res.status(404)
    res.send(`No product found with id: ${id}`)
  } else {
    cartItems[index] = updatedProduct
    res.json(updatedProduct)
  }
})
routes.delete('/cart-items/:id', (req, res) => {
  let id = parseInt(req.params.id)
  console.log(id)
  let index = cartItems.findIndex((item) => {
    return item.id === id
  })
  console.log(index)
  if (index === -1) {
    res.status(404)
    res.send(`No product found with id: ${id}`)
  } else {
    cartItems.splice(index, 1)
    res.sendStatus(204)
  }
})

module.exports = routes

const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Shop = require('./models/shops.js')
const { response, request } = require('express')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))

let shops=[]

console.log(`let shops=[] has the value of ${shops}`)

app.get('/api/shops',(request,response)=>{
    Shop.find({}).then(shops=>{
        response.json(shops)
    })
})

app.get('/api/shops/:id', (request, response) => {
    const id = Number(request.params.id)
    const shop = shops.find(shop => shop.id === id)
    if (shop) {
        response.json(shop)
      } else {
        response.status(404).end()
      }
})

app.post('/api/shops', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const shop = new Shop({
        name:body.content,
        username:body.content,
        description:body.content,
        stars:1
    })
  
    shop.save().then(savedShop => {
        response.json(savedShop)
    })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})









// //*used to get the info from .env so we can use it globally
// require('dotenv').config()
// const express = require('express')
// const app = express()
// app.use(express.json())
// app.use(express.static('build'))

// const cors = require('cors')
// app.use(cors())



// const Shop = require('./src/models/shops.js')
// const { request, response } = require('express')

// app.get('/',(request,response)=>{
//     Shop.find({}).then(shops=>{
//         response.json(shops)
//     })
// })

// app.get('/api/coffeeShops/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const shop = shops.find(shop => shop.id === id)
//     if (shop) {
//         response.json(shop)
//       } else {
//         response.status(404).end()
//       }
// })

// app.post('/api/coffeeShops', (request,response)=>{
//     const body = request.body
//     if(body.content === undefined)
//     {
//         return response.status(400).json({error:'content missing!'})
//     }

//     const shop = new Shop({
//         name:body.content,
//         username:body.content,
//         description:body.content,
//         stars:1
//     })

//     shop.save().then(savedShop => {
//         response.json(savedShop)
//     })
// })


// const PORT = process.env.PORT
// app.listen(PORT, ()=>{
//     console.log(`Server running on port ${PORT}`)
// })
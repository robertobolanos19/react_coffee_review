const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Shop = require('./models/shops')

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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('build'))

let shops=[]

app.get('/api/shops',(request,response) => {
  Shop.find({}).then(shops => {
    response.json(shops)
  })
})

app.get('/api/shops/:id', (request, response) => {
  const id = Number(request.params.id)
  const shop = shops.find(shop => shop.id === id)
  if (shop) {
    response.json(shop)
  }
  else {
    response.status(404).end()
    console.log('Something went wrong')
  }
})

app.post('/api/shops', (request, response, next) => {
  const body = request.body
  console.log(body)
  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const shop = new Shop({
    name:body.name,
    username:body.username,
    description:body.description,
    stars:body.stars
  })

  shop.save()
    .then(savedShop => {
      response.json(savedShop)
    })
    .catch(error => next(error))
})

app.delete('/api/shops/:id', (request,response,next) => {
  Shop.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
      console.log('deleted!')
    })
    .catch(error => next(error))
})

app.put('/api/shops/:id', (request,response,next) => {
  const body = request.body
  const shop = {
    name:body.name,
    username:body.username,
    description:body.description,
    stars:body.stars,
  }

  Shop.findByIdAndUpdate(request.params.id, shop)
    .then(updatedShop => {
      response.json(updatedShop)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)

//! this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})









// //*used to get the info from .env so we can use it globally
// require('dotenv').config()
// const express =  require('express')
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
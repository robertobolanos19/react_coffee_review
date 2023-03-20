const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
.then(result=> console.log('connected to MongoDB'))
.catch((error)=> console.log('Error connecting to MongoDB:', error.message))

const shopSchema = new mongoose.Schema({
    name:String,
    username:String,
    description:String,
    stars:Number,
})

shopSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Shops',shopSchema)
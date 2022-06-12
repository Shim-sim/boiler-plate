const express = require('express')
const app = express()
const port = 3000



const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://shim:abcd1234@boilerplate.9nsez.mongodb.net/?retryWrites=true&w=majority',{
	
}).then(()=> console.log('Modb Connect'))
	.catch(err => console.log(err))

app.get('/', (req, res) => { res.send('Hello Wo 바보라기 rld')})

app.listen(port, ()=> console.log('my first backend-server'))
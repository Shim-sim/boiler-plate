const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const { User } = require("./models/User")

const config = require('./config/key');


app.use(bodyParser.urlencoded({extended: true}));


app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
	
}).then(()=> console.log('Modb Connect'))
	.catch(err => console.log(err))

app.get('/', (req, res) => { res.send('nodemon dd설치완료')})

app.post('/register', (req,res) => {
	//회원 가입 할때 필요한 정보들을 client에서 사져오면
	//그것들을 db에 넣어준다.
		const user = new User(req.body)
		
		user.save((err, userInfo) => {
			if(err) return res.json({success: false, err})
			return res.status(200).json({
				success: true
			})
		})
	})




app.listen(port, ()=> console.log('my first backend-server'))
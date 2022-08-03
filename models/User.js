const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		maxlength: 50
	},
	email: {
		type: String,
		trime: true,
		unique: 1
	},
	password: {
		type: String,
		minlength: 5
	},
	lastname: {
		type: String,
		maxlength: 50
	},
	role: {
		type: Number,
		default: 0
	},
	image: String,
	token: {
		type: String
	},
	tokenExp: {
		type: Number
	}
	
})

//pre()는 몽구스 메서드
//pre('save', function()) 유저모델에 유저 정보를 저장하기 전에 이 함수를 실행함
//next 인자는 바로 register route로 보내주는 기능이다.

userSchema.pre('save', function( next ){
	var user = this;
	
	if(user.isModified('password')) {
		//비밀번호를 암호화 시킨다
		bcrypt.genSalt(saltRounds,function(err, salt){
			if(err) return next(err)

			bcrypt.hash(user.password, salt, function(err, hash) {
				if(err) return next(err)
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})


userSchema.methods.comparePassword = function(plainPassword, callback) {
	bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
		if(err) return callback(err),
		callback(null, isMatch)
	})
}

userSchema.methods.generateToken = function(callback) {
	
	var user = this;
	//jsonwebtoken 활용해서 토큰생성
	var token =	jwt.sign(user._id.toHexString(), 'secretToken');
	user.token = token;
	user.save(function(err, user) {
		if(err) return callback(err);
		callback(null, user);
	})
}

const User = mongoose.model('User', userSchema)

module.exports = {User}


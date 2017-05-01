const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UserSchema.methods.toJSON = function (){
	const user = this;
	const { _id, email } = user;
	return { _id, email };
}

UserSchema.methods.generateAuthToken = function (){
	const user = this;
	const access = 'auth';

	var token = jwt.sign({ _id: user._id.toHexString(), access }, 'library@123').toString();
	console.log(token);
	user.tokens.push({ access, token });

	return user.save().then(() => {
		return token;
	})
}

UserSchema.statics.findByToken = function (token){
	const User = this;
	var decoded;

	try{
		decoded = jwt.verify(token, 'library@123');
	}catch(err){
		return Promise.reject();
	}

	return User.findOne({ 
		'_id': decoded._id, 
		'tokens.token': token,
		'tokens.access': 'auth'
	});
}

UserSchema.pre('save', function(next){
	var user = this;
	if(user.isModified("password")){
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		})
	}else{
		next();
	}
})

UserSchema.statics.findByCredentials = function(email, password){
	var User = this;

	return User.findOne({ email }).then((user) => {
		if(!user){
			console.log("User not found");
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if(res){
					resolve(user);
				}else{
					console.log("password did not match");
					reject();
				}
			})
		})
	})
}

var User = mongoose.model('User', UserSchema);

module.exports = { User };
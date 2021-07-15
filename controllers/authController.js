const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = function(req, res){
    const newUser = new User(req.body)
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10)
    newUser.save((err, user)=>{
        if(err){
            res.status(400)
            return res.json({error: err.message})
        }
        //return res.json(user)
        return res.json({username: user.username, jwt: jwt.sign({username: user.username, email: user.email, _id: user._id},"backend-best-end") })
    })

}

const signIn = function(req,res){
    User.findOne({email: req.body.email}, (err, user)=>{
        if(err){
            res.status(400)
            return res.json({error: err.message})
        }
        if (!user || !user.comparePassword(req.body.password) ){
            res.status(400)
            return res.json({message: "Authentication failed"})
        }
        return res.json({username: user.username, jwt: jwt.sign({username: user.username, email: user.email, _id: user._id},"backend-best-end") })
    })
}


module.exports = {signUp}
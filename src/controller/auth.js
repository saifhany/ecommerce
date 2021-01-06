const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../key')

exports.signup = (req,res) => {
    User.findOne({email:req.body.email})
    .exec((error,user) =>{
        if(user) return res.status(400).json({
            message:'user already registered'
        });
        const {
            firstName
            ,lastName
            ,email
            ,password
        } = req.body;
        const _user = new User({ 
             firstName 
            ,lastName 
            ,email 
            ,password
            ,
            username: Math.random().toString(),
        });
        _user.save((error,data)=>{
            if(error){
                return res.status(400).json({
                    message:'something wrong'
                });
            }
            if(data){
                return res.status(401).json({
                    message : 'user created successfully..!'
                })
            }
        });
        
    });
}

exports.signin = (req,res) =>{
    User.findOne({email:req.body.email})
    .exec((error,user) => {
        if(error) return res.status(400).json({error});
        if(user){
            if(user.authenticate(req.body.password)){
                const token= jwt.sign({_id:user._id,role:user.role},JWT_SECRET,{expiresIn:'1h'});
                const {_id , firstName,lastName,email,role,fullName}=user;
                res.status(200).json({
                    token,
                    user:{
                        _id , firstName,lastName,email,role,fullName 
                    }
                });
            }else{
                return res.status(400).json({
                    message:'invalid'
                })
            }
        }else{
            return res.status(400).json({message:'something wrong'});
        }
    } );
}

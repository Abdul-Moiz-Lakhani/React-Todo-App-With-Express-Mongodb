const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserModel = require('./../models/UserModel');

exports.sign_up_user = (req, res, next) => {
        
    UserModel.find({ _userEmail: req.body.email }).exec().then( user => {
        if(user.length >= 1) {
            return res.status(409).json({
                message: "User Already Exists!",
                status: false
            });
        }
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const registerFormData = new UserModel({
                        _id: new mongoose.Types.ObjectId(),
                        _userName: req.body.name,
                        _userEmail: req.body.email,
                        _userPass: hash,
                        _userTodos: [],
                    });
                    registerFormData.save().then( result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User Registered Successfuly!',
                            data: registerFormData,
                            status: true
                        })
                    }).catch( err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    });
                }
            });
        }
    });
}

exports.sign_in_user = (req, res, next) => {
        
    UserModel.find({ _userEmail: req.body.email }).exec().then( user => {
        
        if(user.length < 1) {
            return res.status(401).json({
                message: "Authentication Failed!",
                status: false
            });
        }
        bcrypt.compare(req.body.password, user[0]._userPass, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: "Authentication Failed!",
                    status: false
                });
            } 
            else if(result) {
                const token = jwt.sign({
                    userId: user[0]._id, 
                    userEmail: user[0]._userEmail
                }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                })

                const data = {
                    name: user[0]._userName,
                    todos: user[0]._userTodos
                }
                
                return res.status(200).json({
                    message: "Authentication Succussful!",
                    token: token,
                    userData: data,
                    status: true
                });
            }
            return res.status(401).json({
                message: "Authentication Failed!",
                status: false
            });
        });
    });
}

exports.get_user = (req, res, next) => {
        
    UserModel.find({ _userEmail: req.userData.userEmail }).exec().then( user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: "Authentication Failed!",
                status: false
            });
        }
        else {
            const data = {
                id: user[0]._id,
                name: user[0]._userName,
                todos: user[0]._userTodos
            }

            return res.status(200).json({
                message: "Authentication Succussful!",
                userData: data,
                status: true
            });
        }
    });
}
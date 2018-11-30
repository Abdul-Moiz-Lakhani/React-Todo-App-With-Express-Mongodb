const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const RegisterModel = require('./../models/registerModel');

router.get('/', (req, res, next)=>{
    
    RegisterModel.find().exec().then( allUsers => {
        console.log(allUsers);
        res.status(200).json(allUsers);
    }).catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.get('/:userId', (req, res, next)=>{
    
    const id = req.params.userId;

    RegisterModel.findById(id).exec().then( data => {
        console.log(data);
        if(data){
            res.status(200).json(data);
        }
        else {
            res.status(404).json({
                message: "User Doesn't Exist!"
            });
        }
    }).catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.patch('/:userId', (req, res, next)=>{ 
    
    const id = req.params.userId;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    RegisterModel.update({ _id: id }, { $set: updateOps}).exec().then( result => {
        console.log(result);
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:userId', (req, res, next)=>{ 
    
    const id = req.params.userId;

    RegisterModel.remove({ _id: id }).exec().then( result => {
        console.log(result);
        res.status(200).json(result);
    }).catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next)=>{
    
    // const credentials = {
    //     userName: req.body.name,
    //     userEmail: req.body.email,
    //     userPass: req.body.password
    // }
    
    const registerFormData = new RegisterModel({
        _id: new mongoose.Types.ObjectId(),
        _userName: req.body.name,
        _userEmail: req.body.email,
        _userPass: req.body.password
    });

    registerFormData.save().then( result => {
        console.log(result);
        res.status(201).json({
            message: 'Hello POST',
            data: registerFormData
        })
    }).catch( err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;
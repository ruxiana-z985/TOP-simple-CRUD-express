const {db} = require('../model/mock_db')
const {body,validationResult} = require('express-validator');

function validateUser(){
  return [
    body('firstname')
    .trim()
    .notEmpty()
    .withMessage("first name can't be empty")
    .isAlpha()
    .withMessage("first name shouldn't contain numbers"),

    body('lastname')
    .trim()
    .notEmpty()
    .withMessage("last name can't be empty")
    .isAlpha()
    .withMessage("lastname can't contain numbers")
]
}


function getAllUsers(req,res){
    const allUsers = db.getAllUsers()
    res.render('index',{allUsers})
}

function getSearchResult(req,res){
  const users = db.searchUser(req.query.username);
  res.render('searchResult',{username:req.query.username,users:users})
}

function getSingleUser(req,res){
    try{
    const userId = req.params.userId;
    const user = db.getSingeUser(userId);
    res.render('userDetail',user)
    }
    catch(err){
        console.log("error when getting a single user",err)
        res.status(404).send("<h1>Page Not Found!</h1>")
    }
    //should be fixed later especially what status code to send in the catch


}

const createNewUser = ((req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).render('error',{error:errors.array()})
    }
    else{
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const confirmObj = db.createUser(firstname,lastname)
    if(!confirmObj.isSuccess){
        res.status(500).render('error',{error:[confirmObj.message]})
    }
    else{
        res.redirect('/user')
    }
    }
    
   

})

const updateUser = ((req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.render('errors',{error:errors.array()})
        
    }else{
    const userId = req.params.userId;
    const fname = req.body.firstname;
    const lname = req.body.lastname;

    const confirmObj = db.updateUser(userId,fname,lname)
    if(!confirmObj.isSuccess){
        res.status(500).render('error',{error:[confirmObj.message]})
    }

    res.status(303).redirect('/users')
    }

    
})

function deleteUser(req,res){
    const userId = req.params.userId
    const confirmObj = db.deleteUser(userId);
    if(!confirmObj.isSuccess){
        res.status(500).render('error',{error:[confirmObj.message]})
    }

    res.status(303).redirect('/');//needs to make sure the status code is right
}


function getCreateForm(req,res){
  try {
    res.render('createForm',{title:"New User Form"})
  } catch (error) {
    res.status(404).render('err',{error:["page not found"]})
  }
}

function getUpdateForm(req,res){
   const userId = req.params.userId;
   const prevUserInfo = db.getSingeUser(userId);
   res.render('updateUser',{user:prevUserInfo});
}

module.exports = {
    getAllUsers,
    getSearchResult,
    getSingleUser,
    getCreateForm,
    createNewUser,
    getUpdateForm,
    updateUser,
    deleteUser,
    validateUser
}

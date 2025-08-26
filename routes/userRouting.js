const {Router,static,urlencoded} = require('express')
const userController = require('../controller/controller');
const userRouter = Router()
const path = require('path')

const assetPath = path.join(__dirname,'../public')

userRouter.use(urlencoded({extended:true}))
userRouter.use(static(assetPath))

userRouter.get('/')
userRouter.get('/:username')
userRouter.get('/:username/:userId')
userRouter.get('/create')

userRouter.post('/create')


module.exports = userRouter
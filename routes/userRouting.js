const {Router,static,urlencoded} = require('express')
const userController = require('../controller/controller');
const userRouter = Router()
const path = require('path')

const assetPath = path.join(__dirname,'../public')

userRouter.use(urlencoded({extended:true}))
userRouter.use(static(assetPath))


userRouter.get('/',userController.getAllUsers);
userRouter.get('/search',userController.getSearchResult);
userRouter.get('/create',userController.getCreateForm);
userRouter.get('/:userId',userController.getSingleUser);
userRouter.get('/:userId/update',userController.getUpdateForm)

userRouter.post('/create',userController.validateUser(),userController.createNewUser)
userRouter.post('/:userId/update',userController.validateUser(),userController.updateUser)
userRouter.post('/:userId/delete',userController.deleteUser)



module.exports = {userRouter}
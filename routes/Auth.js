const Validate = require ('../validate/valid')
const express = require ('express')
const router = express.Router()


const Authcontroller = require ("../controllers/Authcontroller")

router.post('/register',Validate.signupUser,Authcontroller.register)
router.post('/login',Validate.loginUser,Authcontroller.login)
router.get('/getUser',Authcontroller.getUser)
router.get('/getid/:id',Authcontroller.getid)

router.put("/editUser/:id",Validate.updateUser,Authcontroller.editUser)
router.delete("/deleteUser/:id",Authcontroller.deleteUser)




module.exports = router
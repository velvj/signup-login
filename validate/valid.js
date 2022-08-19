const Joi = require('joi')

const Valid = Joi.object({
    name: Joi.string().required().min(3),

    phone: Joi.number().required().min(1000000000).max(9999999999).error(new Error('Please enter a valid phone number')),

    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).lowercase().required().error(new Error('Please enter a valid Email ID')),

    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().error(new Error('Please enter a valid password'))

})
const signupUser = async (req, res, next) => {
    try {
        
        await Valid.validateAsync({ ...req.body });
        next()
    } catch (err) {
        if (err)
        err.status = res.status(400).json({ status: 400, message: err.message || err } )
    next(err)
      
    }
};
const Validating = Joi.object({


    username:Joi.string().email().allow("").error(new Error('Please enter a valid Email ID')).required(),
   
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).error(new Error('Please enter a valid Password')).required()

})
const loginUser = async (req, res, next) => {
    try {
        
       let {val} = await Validating.validateAsync({ ...req.body });
        next()
    } catch (err) {
        if (err)
         err.status =   res.status(400).json({ status: 400, message: err.message || err} )
    next(err)
      
    }
};


const updateUser = async (req, res, next) => {
    try {
        
        await Valid.validateAsync({ ...req.body });
        next()
    } catch (err) {
        if (err)
        err.status = res.status(400).json({ status: 400, message: err.message || err } )
    next(err)
      
    }
};

module.exports = { signupUser,loginUser ,updateUser}



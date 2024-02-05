const asyncHandler = require("express-async-handler")


/**
 * @desc   Get Forgot Password View
 * @route  /password/forgot-password
 * @method Get
 * @access public
 */
module.exports.getForgotPasswordView = asyncHandler((req,res)=>{
    res.render('forgot-password')
})
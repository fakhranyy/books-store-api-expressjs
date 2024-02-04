const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User");
const {verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/verifyToken");


/**
 * @desc   get all users
 * @route  /api/users/
 * @method GET
 * @access private (only admins)
 */
router.get("/", verifyTokenAndAdmin, asyncHandler(async(req, res)=>{
  const users = await User.find().select("-password");
  res.status(200).json(users);
}) )


/**
 * @desc   get user by id
 * @route  /api/users/:id
 * @method GET
 * @access private (only admins & user itself)
 */
router.get("/:id", verifyTokenAndAuthorization, asyncHandler(async(req, res)=>{
  const user = await User.findById(req.params.id).select("-password");
  if (user){
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "user not found"})
  }
}) )



/**
 * @desc   update an user
 * @route  /api/users/:id
 * @method PUT
 * @access private
 */

router.put(
  "/:id", 
  verifyTokenAndAuthorization ,
  asyncHandler(async (req, res) => {

    const { error } = validateUpdateUser(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
        },
      },
      { new: true }
    ).select("-password");
    res.status(200).json(updateUser);
  })
);



/**
 * @desc   delete user by id
 * @route  /api/users/:id
 * @method DELETE
 * @access private (only admins & user itself)
 */
router.delete("/:id", verifyTokenAndAuthorization, asyncHandler(async(req, res)=>{
  const user = await User.findById(req.params.id).select("-password");
  if (user){
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "user has been deleted successfully"});
  } else {
    res.status(404).json({ message: "user not found"})
  }
}) )


module.exports = router;

const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controller/usersController");

//* /api/users/
router.get("/", verifyTokenAndAdmin, getAllUsers);

//* /api/users/:id
router.route("/:id")
  .get(verifyTokenAndAuthorization, getUserById)
  .put(verifyTokenAndAuthorization, updateUser)
  .delete(verifyTokenAndAuthorization, deleteUser);

module.exports = router;

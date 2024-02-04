const jwt = require("jsonwebtoken");
// verifyoekn
function verifyToken(req, res, next) {
  const token = req.headers.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "invalid token " });
    }
  } else {
    res.status(401).json({ message: "no token provided" });
  }
}

// verifyToken & Authorized the user
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdEamin) {
      next();
    } else {
      return res.status(403).json("You are not allowed");
    }
  });
}

// verifyToken & admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not allowed, Only admins allowed");
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};

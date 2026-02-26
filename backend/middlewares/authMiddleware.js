const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    // get token from cookie OR Authorization header
    let token = null;

    // 1. check cookie first
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 2. check Authorization header if no cookie
    else if (req.headers.authorization &&
             req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // if no token found
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token"
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to request
    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Not authorized, invalid token"
    });

  }
};

module.exports = authMiddleware;
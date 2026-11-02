const jwt = require("jsonwebtoken");

const generateToken = (user) => {

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    if (!process.env.JWT_EXPIRES_IN) {
        throw new Error("JWT_EXPIRES_IN is not configured");
    }

    return jwt.sign({
        userId : user._id,
        role : user.role
    },
        process.env.JWT_SECRET,
    {
        expiresIn : process.env.JWT_EXPIRES_IN,
        algorithm : "HS256"
    });
};

module.exports = generateToken;
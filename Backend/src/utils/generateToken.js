const jwt = require("jsonwebtoken");

const generateToken = (user) => {

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    return jwt.sign({
        userId : user._id,
        role : user.role
    },
        process.env.JWT_SECRET,
    {
        expiresIn : "1h",
        algorithm : "HS256"
    });
};

module.exports = generateToken;
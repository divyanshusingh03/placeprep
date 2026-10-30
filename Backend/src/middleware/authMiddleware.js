const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try{
        // Extract the Authorization header.
        const authHeader = req.headers.authorization;

        // Check whether the token is provided.
        if(!authHeader || !authHeader.startsWith("Bearer")){
            res.status(401).json({
                success : false,
                message : "Access denied. Token is missing"
            });
        }

        // Extract the JWT from the Bearer token.
        const token = authHeader.split(" ")[1];

        // Verify the token using the JWT secret.
        const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET,
                {
                algorithms : ["HS256"]
                }
            );

        // Attach authenticated user information to the request.
        req.user = decoded;

        // Allow the request to proceed.
        next();

    }
    catch(error){
        return res.status(401).json({
                success : false,
                message : "Invalid or expired token."
            });
    }

};

module.exports = authMiddleware;
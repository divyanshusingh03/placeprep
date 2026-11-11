const authorizeRole = (requiredRole) => {

    return (req, res, next) => {
        const role = req.user.role;

        // Check whether the authenticated user has the required role.
        if(role !== requiredRole){
            return res.status(403).json({
                success : false,
                message : "Access forbidden. Insufficient permissions."
            });
        }

        // Allow the request to proceed if the role matches.
        next();
    };

};

module.exports = authorizeRole;
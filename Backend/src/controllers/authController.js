const registerUser = (req, res) => {
    
    // Extract the fields required for registration.
    const { name, email, password }= req.body;

    // Reject requests with missing or falsy required values.
    if(!name || !email || !password){
        return res.status(400).json({
            success : false,
            message : "Name, email and password are missing"
        });
    }

    // Check types before calling string methods on the values.
    if(typeof(name) !== "string" || typeof(email) !== "string" || typeof(password) !== "string"){
        return res.status(400).json({
            success : false,
            message : "Name, email and password must be string"
        });
    }

    // Normalize name and email; preserve the original password.
    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    // Reject empty or whitespace-only values.
    if(normalizedName === "" || normalizedEmail === ""){
        return res.status(400).json({
            success : false,
            message : "Fields cannot be empty"
        });
    }

    // Perform a basic email-format check.
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regexEmail.test(normalizedEmail)){
        return res.status(400).json({
            success : false,
            message : "Please enter a valid email"
        });
    }

    // Enforce the minimum password length without modifying it.
    if(password.length < 8){
        return res.status(400).json({
            success : false,
            message : "Password must be 8 chahracters long"
        });
    }

    // Return a temporary response until user creation is implemented.
    res.status(200).json({
        success : true,
        message : "Input validation successful"
    });

}

module.exports = { registerUser };
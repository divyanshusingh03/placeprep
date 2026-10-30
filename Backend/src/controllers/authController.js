const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
    
    try{    
        
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
                message : "Password must be 8 characters long"
            });
        }

        // Check whether the email is already registered.
        const existingUser = await User.findOne({
            email : normalizedEmail
        });

        // Stop registration if a matching user already exists.
        if(existingUser){
            return res.status(409).json({
                success : false,
                message : "Email already exists. Please login"
            });
        }

        // Hash the password before storing it in the database.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user with normalized data and a default student role.
        const newUser =   await User.create({
                            name : normalizedName,
                            email : normalizedEmail,
                            password : hashedPassword,
                            role : "student"
                        });

        const token = generateToken(newUser);

        // Send a 201 Created response after successful user registration.
        res.status(201).json({
            success : true,
            message : "User created successfully",
            token
        });
         
    }
    catch(error){

        // Handle duplicate-key errors from MongoDB.
        if(error.code === 11000){

            return res.status(409).json({
                success : false,
                message : "Email already exists. Please login"
            });

        }

        // Log unexpected errors for debugging.
        console.error("Registration error : ", error);

        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        });
        
    }

};

//
const loginUser = async (req, res)=>{

    try{
        // Extract the credentials required for login.
        const { email, password } = req.body;

        // Reject requests with missing credentials.
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "Email and password are missing"
            });
        }

        // Validate input types before using string methods.
        if(typeof(email) !== "string" || typeof(password) !== "string"){
            return res.status(400).json({
                success : false,
                message : "Email and password must be strings"
            });
        }

        // Normalize the email consistently with registration.
        const normalizedEmail = email.trim().toLowerCase();

        // Reject empty or whitespace-only email values.
        if(normalizedEmail === ""){
            return res.status(400).json({
                success : false,
                message : "Fields cannot be empty"
            });
        }

        // Validate the basic email format.
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!regexEmail.test(normalizedEmail)){
            return res.status(400).json({
                success : false,
                message : "Please enter a valid email"
            });
        }

        // Find the user associated with the normalized email.
        const existingUser = await User.findOne({
            email : normalizedEmail
        });

        // Use the same message for an unknown email and wrong password.
        if(!existingUser){
            return res.status(401).json({
                success : false,
                message : "Invalid email or password."
            });
        }

        // Compare the entered password with the stored bcrypt hash.
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        // Reject incorrect passwords.
        if(!isPasswordValid){
            return res.status(401).json({
                success : false,
                message : "Invalid email or password."
            });
        }

        //
        const token = generateToken(existingUser);

        // Confirm successful login without exposing sensitive data.
        res.status(200).json({
            success : true,
            message : "Login successful",
            token
        });

    }
    catch (error) {
        // Log unexpected errors for debugging.
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

};

module.exports = { registerUser, loginUser };
const Company = require('../models/Company');

// Handle creation of a new company.
const createCompany = async (req, res) => {
    try{
        // Extract the fields required for the creation of company.
        const { name, description, website } = req.body || {};

        // Check whether required company details are provided.
        if(!name || !description){
            return res.status(400).json({
                success : false,
                message : "Company name and description are required."
            });
        }

        // Validate the data types of company details.
        if(typeof(name) !== "string" || typeof(description) !== "string" || (website !== undefined && typeof(website) !== "string")){
            return res.status(400).json({
                success : false,
                message : "Invalid data types provided."
            });
        }

        // Remove leading and trailing whitespace.
        const normalizedName = name.trim();
        const normalizedDescription = description.trim();

        if(!normalizedName || !normalizedDescription){
            return res.status(400).json({
                success : false,
                message : "Company name and description cannot be empty."
            });
        }

        // Remove leading and trailing whitespace from the website URL.
        const normalizedWebsite = website?.trim();

        // Create and save a new company document.
        const company = await Company.create({
            name : normalizedName,
            description : normalizedDescription,
            website : normalizedWebsite
        });

        return res.status(201).json({
            success : true,
            message : "Company created successfully.",
            company
        });
    }
    catch(error){
        // Handle Mongoose schema validation errors.
        if(error.name === "ValidationError"){
            return res.status(400).json({
                success : false,
                message : error.message
            });
        }

        // Handle unexpected server errors.
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        });
    }
};

const updateCompany = async (req, res) => {
    try{
        // Handle updating an existing company.
        const { id: companyId } = req.params;

        if(!/^[0-9a-fA-F]{24}$/.test(companyId)){
            return res.status(400).json({
                success: false,
                message: "Invalid company ID."
            });
        }

        // Find the company using its ID.
        const company = await Company.findById(companyId);

        // Check whether the company exists.
        if(!company){
            return res.status(404).json({
                success: false,
                message: "Company not found."
            });
        }

        // Extract updated company details from the request body.
        const { name, description, website } = req.body || {};

        // Check whether required company details are provided.
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Company name and description are required."
            });
        }

        // Validate the data types of company details.
        if (
            typeof name !== "string" ||
            typeof description !== "string" ||
            (website !== undefined && typeof website !== "string")
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid data types provided."
            });
        }

        // Remove leading and trailing whitespace.
        const normalizedName = name.trim();
        const normalizedDescription = description.trim();

        // Remove leading and trailing whitespace from the website URL.
        const normalizedWebsite = website?.trim();

        // Check whether required fields contain only whitespace.
        if (!normalizedName || !normalizedDescription) {
            return res.status(400).json({
                success: false,
                message: "Company name and description cannot be empty."
            });
        }

        // Update the company details.
        company.name = normalizedName;
        company.description = normalizedDescription;
        company.website = normalizedWebsite;

        // Save the updated company document.
        await company.save();

        return res.status(200).json({
            success: true,
            message: "Company updated successfully.",
            company
        });
    }
    catch(error){
        // Handle Mongoose schema validation errors.
        if(error.name === "ValidationError"){
            return res.status(400).json({
                success : false,
                message : error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// Export controller functions.
module.exports = { createCompany, updateCompany };
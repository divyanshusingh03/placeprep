const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true
        },
        description : {
            type : String,
            required : true,
            trim : true
        },
        website : {
            type : String,
            trim : true,
            validate : {
                    validator : function (value){
                    return /^https?:\/\/.+\..+/.test(value);
                },
                message : "Please provide a valid website URL."
            }
        }
    },
    {
        timestamps : true
    }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
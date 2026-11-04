const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        company : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Company",
            required : true
        },
        role : {
            type : String,
            required : true,
            trim : true
        },
        eligibility : {
            minCgpa: {
                type: Number,
                min: 0,
                max: 10,
                required: true
            },
            minTenthPercentage: {
                type: Number,
                min: 0,
                max: 100
            },
            minTwelfthPercentage: {
                type: Number,
                min: 0,
                max: 100
            },
            eligibleBranches: {
                type: [String],
                required: true,
                validate: {
                    validator: function(branches){
                        return branches.length > 0;
                    },
                    message: "At least one eligible branch is required."
                }
            },
            graduationYear: {
                type: Number,
                required: true,
                min: 1,
                validate: {
                    validator: Number.isInteger,
                    message: "Graduation year must be an integer."
                }
            }
        },
        packageLpa: {
            type: Number,
            required: true,
            min: 0
        },
        applicationStartDate: {
            type: Date,
            required: true
        },
        applicationDeadline: {
            type: Date,
            required: true
        }
    },
    {
        timestamps : true
    }
);

jobSchema.pre("validate", function(){
    if(this.applicationStartDate && this.applicationDeadline && this.applicationDeadline < this.applicationStartDate){
        this.invalidate(
            "applicationDeadline",
            "Application deadline must be after the start date."
        );
    }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
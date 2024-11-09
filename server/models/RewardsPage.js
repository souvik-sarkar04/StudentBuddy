const mongoose = require("mongoose");

const RewardsSchema = new mongoose.Schema({

    id: {},

    YourXPs: { type: Number },

    TotalXPs: { type: Number },

    Rank: { type: Number },

    TotalCourses: { type: Number },

    CompletedCourses: { type: Number },

    TotalAssignments: { type: Number },

    CompletedAssignments: { type: Number }

});
module.exports = mongoose.model("Rewards", RewardsSchema);

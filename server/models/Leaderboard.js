const mongoose=require("mongoose");

const LeaderboardSchema=new mongoose.Schema({
    Rank:{
        type:Number
    },
    UserId:{
        type:String
    },
    UserAuraXPs:{
        type:Number
    }
});
module.exports=mongoose.model("LeaderboardPage",LeaderboardSchema);
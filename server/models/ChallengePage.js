const mongoose=require("mongoose");
 const ChallengePageSchema= new mongoose.Schema({

    challengesBar:{
        type:String
    },
    challenges:{
        type:String
    },
    AuraXPs:{
        type:Number
    },
    ChallengesCompleted:{
        type:String
    },
    Rules:{
        type:String
    },
 });
 module.exports=mongoose.model("ChallengePage",ChallengePageSchema);
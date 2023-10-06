const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

 const followerSchema = new mongoose.Schema({
    followers: [
         {
            type: ObjectId,
            ref: "User", // Reference 
        },
     ],
 });

mongoose.model("hpl", followerSchema); 

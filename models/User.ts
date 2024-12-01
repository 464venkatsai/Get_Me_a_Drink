import mongoose from "mongoose";
import { use } from "react";

const {Schema, model} = mongoose;

const UserSchema = new Schema({
    email : {type: String, required: true},
    username : {type: String, required: true},
    image : {type: String},
    coverImg : {type: String},
    rasorPayId : {type: String},
    rasorPaySecret : {type: String}
});

export default mongoose.models.User || model("User",UserSchema);
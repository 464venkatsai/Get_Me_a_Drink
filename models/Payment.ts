import mongoose from "mongoose";
const {Schema,model} = mongoose

const PaymentSchema = new Schema({
    orderId : {type: String, required: true},
    name : {type: String, required: true},
    toUser : {type: String, required: true},
    amount : {type: Number, required: true},
    message : {type: String},
    done : {type: Boolean, default: false},
    createdAt : {type: Date, default: Date.now},
    updatedAt : {type: Date, default: Date.now}
})

export default mongoose.models.Payment || model("Payment", PaymentSchema)
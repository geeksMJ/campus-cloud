import mongoose from "mongoose";

const certificateSchema = mongoose.Schema({
    certificate:String
})

const Certificate = mongoose.model("Certificate",certificateSchema)

export default Certificate;
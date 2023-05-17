import mongoose from "mongoose";

//create table for Medecine
const medecineSchema = new mongoose.Schema({

    medecineId: {type: String, required: true, unique: true}, //only one id
    Name: {type: String, required: true},
    disease: {type: String, required: true},
    availability: {type: String}

}, {
    timestamps: true //add date
});

const Medecine = mongoose.model('Medecine', medecineSchema);
export default Medecine;
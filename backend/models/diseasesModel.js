import mongoose from "mongoose";

//create table for diseases
const diseasesSchema = new mongoose.Schema({

    diseaseName: {type: String, required: true, unique: true}, //only one name
    diseaseSymptoms: {type: String, required: true},
    diseaseMedecine: {type: String, required: true},
    totalMedecine: {type: Number, required: true},

}, {
    timestamps: true //add date
});

const Diseases = mongoose.model('Diseases', diseasesSchema);
export default Diseases;
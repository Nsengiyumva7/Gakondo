import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddDisease = ({setOpen}) => {

    const navigate = useNavigate();

    const [diseaseName, setDiseaseName] = useState('');
    const [diseaseSymptoms, setDiseaseSymptoms] = useState('');
    const [diseaseMedecine, setDiseaseMedecine] = useState('');
    const [totalMedecine, setTotalMedecine] = useState(0); // 0 for default

    const addDiseaseHandler = async(e) => {
        e.preventDefault();

        try {

            await axios.post('api/diseases/add', {

                diseaseName,
                diseaseSymptoms,
                diseaseMedecine,
                totalMedecine

            });
            toast.success('You have successfully added. Centres details!');
            navigate('/disease');
            setOpen(false);

        } catch(error) {
            toast.error('Add failed, please try again!');
        }

    }

  return (
    <div className='quick-container'>
        <form className='formAdd' onSubmit={addDiseaseHandler}>
          <div className="card-quick">
            <div className="card-flex">
                <div className="card-row">
                    <label>Disease Name</label>
                    <input type="text" required onChange={(e) => setDiseaseName(e.target.value)} placeholder='Name' />
                </div>
            </div>
            <div className="card-flex">
                <div className="card-row">
                <label>Symptoms</label>
                    <input type="text" className='disease-input' onChange={(e) => setDiseaseSymptoms(e.target.value)} required placeholder='ex: colombo' />
                </div>
            </div>
            <div className="card-flex">
                <div className="card-row">
                <label>Medecine</label>
                    <input type="text" className='disease-input' onChange={(e) => setDiseaseMedecine(e.target.value)} required placeholder='example@gmail.com' />
                </div>
            </div>
            <div className="card-flex">
                <div className="card-row">
                <label>Total Medecine</label>
                    <input type="number" className='disease-input' onChange={(e) => setTotalMedecine(e.target.value)} placeholder='Total Medecine' min={0} defaultValue={0} required />
                </div>
            </div>
            
            <div className="card-flex">
            <div className="card-row">
                <button className='add'>Add</button>
            </div>

            <div className="card-row">
                <button className='back' onClick={() => setOpen(false)}>Close</button>
            </div>

        </div>
      </div>
    </form>
</div>
  )
}

export default AddDisease
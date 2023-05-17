import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//Medecine  medecine

export const AddMedecine = ({setOpen}) => {

    const navigate = useNavigate();

    const [medecineId, setMedecineId] = useState('');
    const [Name, setName] = useState('');
    const [disease, setDisease] = useState('');
    const [availability, setAvailability] = useState('');

    const addMedecineHandler = async(e) => {
        e.preventDefault();

        try {

            await axios.post('api/medecine/add', {

                medecineId,
                Name,
                disease,
                availability

            });
            toast.success('You have successfully added. Medecine!');
            navigate('/medecine');
            setOpen(false);

        } catch(error) {
            toast.error('Add failed, please try again!');
        }
    }

  return (
    <div className='quick-container'>
    <form className='formAdd' onSubmit={addMedecineHandler}>
      <div className="card-quick">
        <div className="card-flex">
            <div className="card-row">
                <label>Medecine ID</label>
            <input type="text" required onChange={(e) => setMedecineId(e.target.value)} placeholder='Medecine ID' />
            </div>
        </div>
        <div className="card-flex">
            <div className="card-row">
            <label> Name</label>
            <input type="text" required onChange={(e) => setName(e.target.value)} placeholder=' Name' />
            </div>
            <div className="card-row">
            <label>related_disease</label>
            <input type="text" required onChange={(e) => setDisease(e.target.value)} placeholder='related_disease' />
            </div>
        </div>

      
        <div className="card-flex">
        <div className="card-row">
        <label>Status</label>
                    <select name="" id="" onChange={(e) => setAvailability(e.target.value)}>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                    </select>
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

export default AddMedecine
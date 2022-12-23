import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from "react-router-dom/Link";
import { addBandThunk } from '../../store/singleBand';

const AddBand = ({user, newBand, setNewBand}) => {
    const [name, setName] = useState(``); 
    const [bio, setBio] = useState(``);
    const [band, setBand] = useState(null);

    const onSubmit = (e) => {
      console.log(e)
      setBand({
        name: name,
        bio: bio,
        user: user
      })
      setNewBand(!newBand);
    }
    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleBio = (e) => {
        setBio(e.target.value);
    }

    const dispatch = useDispatch();
    useEffect(() => {
        if(band) {
            dispatch(addBandThunk(band));
        }
    }, [band]);
    
  
    return (
        <div className='App'>
            <form onSubmit={onSubmit}>
                <input type="text" value={name} placeholder='Name your band...' onChange={handleName}/>
                <input type="text" value={bio} placeholder='Bio' onChange={handleBio}/>
                <button className='btn_action pp'>Submit</button>
            </form>
            {/* <Link to="/home">Back</Link> */}
        </div>
    );
};

export default AddBand
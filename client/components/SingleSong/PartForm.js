import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { baseApp } from '../../base';
import 'firebase/firestore';
import { addPartThunk } from '../../store/singleSong';
import {BsPlusLg} from 'react-icons/bs'

const PartForm = ({ setSubmit, submit }) => {
    const [audioUrl, setAudioUrl] = useState(null);
    const [partName, setPartName] = useState(null);
    const { id } = useSelector((state) => state.auth);
    const song = useSelector((state) => state.song);

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = baseApp.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        setAudioUrl(await fileRef.getDownloadURL());
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(audioUrl) {
            setPartName(e.target.name.value)
        }
    }
    
    const dispatch = useDispatch();
    useEffect(() => {
        // console.log("audioUrl", audioUrl, "song", song);
        if(audioUrl && partName) {
            dispatch(addPartThunk({name: partName, audioUrl: audioUrl, songId: song.song.id, bandId: song.song.bandId, userId: id}));
            setSubmit(!submit);
        }
    }, [partName]);

    return (
        <form onSubmit={onSubmit}>
            <label>upload audio</label>
            <input type="file" onChange={onFileChange} />
            <input type="text" name='name' placeholder='Part Name'/>
            <button className='plus_sign'> <h3>Submit</h3> <BsPlusLg/></button>
        </form>
    );
};

export default PartForm;
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { baseApp } from '../base';
import 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { addPartThunk } from '../store/singleSong';

const PartForm = () => {
    const [audioUrl, setAudioUrl] = useState(null);
    const [name, setName] = useState(null);
    const { register, handleSubmit } = useForm();
    const { id } = useSelector((state) => state.auth);
    const song = useSelector((state) => state.song);

    const handleChange = (evt) => {
        setName(evt.target.value);
    }


    const onSubmit = async (data) => {
        await data;
        console.log(data);
        const storage = getStorage();
        const storageRef = ref(storage, data.audio[0].name);
        uploadBytes(storageRef, data).then((snapshop) => {
            console.log('file uploaded, data');
            getDownloadURL(storageRef).then((url) => {
                setAudioUrl(url);
            })
        });
    };
    
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("audioUrl", audioUrl, "song", song);
        if(audioUrl) {
            dispatch(addPartThunk({name: name, audioUrl: audioUrl, songId: song.song.id, bandId: song.song.bandId, userId: id}));
        }
    }, [audioUrl]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>upload audio</label>
            <input {...register('audio', { required: true })} type="file" />
            <label>Part Name</label>
            <input value={name} onChange={handleChange}/>
            <button className='btn_action pp'>Submit</button>
        </form>
    );
};

export default PartForm;
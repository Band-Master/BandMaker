import React, {useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
import { baseApp } from '../base';
import 'firebase/firestore';
import { updateUserThunk } from '../store/singleUser';

const CoverForm = ({ user }) => {
    const [imgUrl, setImgUrl] = useState(null);
    const [load, setLoad] = useState(false)

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = baseApp.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        setImgUrl(await fileRef.getDownloadURL());
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if(imgUrl) {
            setLoad(true);
        }
    }

    const dispatch = useDispatch();
    useEffect(() => {
        if(imgUrl) {
            console.log('imgurl', imgUrl);
            dispatch(updateUserThunk({...user, coverUrl: imgUrl}));
        }
    }, [load]);

    return (
        <form onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange}/>
        <button className='btn_action pp'>Submit</button>
      </form>
    );
};

export default CoverForm;
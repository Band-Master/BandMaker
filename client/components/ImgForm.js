import React, {useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { baseApp } from '../base';
import 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { updateUserThunk } from '../store/singleUser';

const ImgForm = ({ user }) => {
    const [imgUrl, setImgUrl] = useState(null);
    const { register, handleSubmit } = useForm();


    const onSubmit = (data) => {
        const storage = getStorage();
        const storageRef = ref(storage, data.picture[0].name);
        let file = new Blob(
            [data],
            {type: "image.*"}
        )
        uploadBytes(storageRef, file).then((snapshop) => {
            // console.log('data', data, 'storageRef', storageRef, 'storage', storage);
            getDownloadURL(storageRef).
            then((url) => {
                // let file = new Blob(
                //     [url],
                //     { type: "image.*" }
                // )
                // let newFile = new File([file], data.picture[0].name, {type: "image.*"})
                // setImgUrl(newFile);
                console.log(snapshop);
                setImgUrl(url);
            })
        });
    };

    const dispatch = useDispatch();
    useEffect(() => {
        if(imgUrl) {
            console.log('imgurl', imgUrl);
            dispatch(updateUserThunk({...user, imgUrl: imgUrl}));
        }
    }, [imgUrl]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('picture', { required: true })} type="file" />
        <button className='btn_action pp'>Submit</button>
      </form>
    );
};

export default ImgForm;
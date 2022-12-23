import React, {useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
import { addSongThunk } from "../../store/singleSong";
import Link from "react-router-dom/Link";

const AddSong = ({bandId, deleted, setDeleted}) => {
    const [bpm, setBpm] = useState(0);
    const [title, setTitle] = useState(``);
    const [song, setSong] = useState(null)

    const dispatch = useDispatch();
    useEffect(() => {
        if(song) {
            dispatch(addSongThunk(song))
            setDeleted(!deleted);
        }
    }, [song]);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleBpm = (e) => {
        setBpm(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setSong({
            title: title,
            bpm: bpm,
            bandId: bandId
        })
    }
    return (
        <div className='App'>
            <form onSubmit={onSubmit}>
                <input type="text" value={title} placeholder='Name your song...' onChange={handleTitle}/>
                <input type="number" value={bpm} placeholder='tempo' onChange={handleBpm}/>
                <button className='btn_action pp'>Submit</button>
            </form>
            {/* <Link className='action_btns'to={`/bands/${props.match.params.bandId}`}>Back</Link> */}
        </div>
    );
};

export default AddSong
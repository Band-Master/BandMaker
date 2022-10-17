import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Link from "react-router-dom/Link";
import { setMemberThunk } from '../../store/singleBand';
import { fetchAllUsersThunk } from '../../store/allUsers';
// need all users, send single userId and bandId in add member thunk 

const AddMembers = () => {
    const [userId, setUserId] = useState(null)
    const band = useSelector((state) => state.band)
    const users = useSelector((state) => state.users);
    const bandMembers = band.users.map((user) => {
        return user.id
    });

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllUsersThunk());
    }, []);

    useEffect(() => {
        if(userId) {
            dispatch(setMemberThunk({bandId: band.id, userId: userId}));
        }
    }, [userId])


    console.log("band.users", bandMembers);
  
    return (
        <div className='App'>
            {users ? users.filter((user) => !bandMembers.includes(user.id)).map((user) => {
                return (
                    <button className='btn_action pp' onClick={() => setUserId(user.id)} key={user.id}>Add {user.username}</button>
                )
            }) : null}
            <Link to={`/bands/${band.id}`}>Back</Link>
        </div>
    );
};

export default AddMembers
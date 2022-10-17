import React, { useEffect } from "react";
import ImgForm from "../ImgForm";
import CoverForm from './CoverForm';
import { fetchUserThunk } from "../../store/singleUser";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = (props) => {
  const { id } = props;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserThunk(id));
  }, []);
  console.log(user);
  return (
    <div>
      <div className="pics_wrapper">
          {user.coverUrl ? 
          <div className="cover">
            <img src={user.coverUrl}/>
          </div> : 
          <div className="cover">
            <h5>upload cover picture</h5>
            <CoverForm user={user} />
          </div>
          }
          {user.imgUrl ? 
            <div className="id-section">
              <div className="circle">
                <img src={user.imgUrl} className="profile"/>
              </div>
              <div className="profile-id">
                <h3>{user.username}</h3>
              </div>
            </div>
            : 
            <div className="id-section">
              <div className="circle">
                <h5>upload profile picture</h5>
                <ImgForm user={user} id="formbar"/>
              </div>
            </div>
            }
        </div>
        
    </div>
  );
};

export default Sidebar;
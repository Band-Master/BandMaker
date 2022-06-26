import axios from "axios";

const initialstate = [];

const FetchUsers = "FETCH_Users";


//this page is for admin control of user

export const FetchAllUsers = (users) => {
  return { type: FetchUsers, users };
};


export const fetchAllUsersThunk = () => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/api/users`);
      let users = response.data;
      dispatch(FetchAllUsers(users));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function allUsersReducer(state = initialstate, action) {
  switch (action.type) {
    case FetchUsers:
      return action.users;
    default:
      return state;
  }
}
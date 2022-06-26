import axios from "axios";

const initialstate = {};

const FetchBand = "FETCH_BAND";
const DeleteBand = "DELETE_BAND";
const UpdateBand = "UPDATE_BAND";
const AddBand = "ADD_BAND";
const SetMember = "SET_MEMBER";

//this page is for admin control of user

export const fetchBand = (band) => {
  return { type: FetchBand, band };
};

export const deleteBand = (band) => {
  return { type: DeleteBand, band };
};

export const updateBand = (band) => {
  return { type: UpdateBand, band };
};

export const addBand = (band) => {
  return { type: AddBand, band };
}

export const setMember = (band) => {
  return {type: SetMember, band};
}

export const fetchBandThunk = (id) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/api/bands/${id}`);
      let band = response.data;
      // includes Songs, Parts, and Users as Members
      dispatch(fetchBand(band));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateBandThunk = (band) => {
  return async function (dispatch) {
    try {
      let response = await axios.put(`/api/bands/${band.id}`, band);
      let newBand = response.data;
      dispatch(updateBand(newBand));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addBandThunk = (band) => {
  return async function (dispatch) {
    try {
      let response = await axios.post(`/api/bands/add`, band);
      let newBand = response.data;
      dispatch(addBand(newBand));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setMemberThunk = (band) => {
  return async function (dispatch) {
    try {
      let response = await axios.put(`/api/bands/${band.bandId}/addMembers`, band);
      let newband = response.data
      console.log("newband", newband);
      dispatch(setMember(newband));
    } catch (err) {
      console.log(err);
    }
  }
}

export default function bandReducer(state = initialstate, action) {
  switch (action.type) {
    case FetchBand:
      return action.band;
    case DeleteBand:
      return initialstate;
    case UpdateBand:
      return action.band;
    case AddBand:
      return action.band;
    case SetMember:
      return action.band;
    default:
      return state;
  }
}

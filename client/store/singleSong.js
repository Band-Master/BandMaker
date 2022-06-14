import axios from "axios";

const initialstate = {};

const FetchSong = "FETCH_SONG";
const DeleteSong = "DELETE_SONG";
const UpdateSong = "UPDATE_SONG";

//this page is for admin control of user

export const fetchSong = (song) => {
  return { type: FetchSong, song };
};

export const deleteSong = (song) => {
  return { type: DeleteSong, song };
};

export const updateSong = (song) => {
  return { type: UpdateSong, song };
};

export const fetchSongThunk = (id) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/api/songs/${id}`);
      let band = response.data;
      // includes Songs, Parts, and Users as Members
      dispatch(fetchSong(band));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateSongThunk = (song) => {
  return async function (dispatch) {
    try {
      let response = await axios.put(`/api/songs/${song.id}`, song);
      let newSong = response.data;
      dispatch(updateSong(newSong));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function songReducer(state = initialstate, action) {
  switch (action.type) {
    case FetchSong:
      return action.song;
    case DeleteSong:
      return initialstate;
    case UpdateSong:
      return action.song;
    default:
      return state;
  }
}

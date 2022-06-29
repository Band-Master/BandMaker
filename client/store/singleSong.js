import axios from "axios";


const initialState = {
  song: {},
  currentPart: 0,
  parts: [],
  repeat: false,
  random: false,
  playing: false,
  audio: [],
};

const FetchSong = "FETCH_SONG";
const DeleteSong = "DELETE_SONG";
const UpdateSong = "UPDATE_SONG";
const AddPart = "ADD_PART";
const AddSong = "ADD_SONG";
const AddAudio = "ADD_AUDIO";



//action creators
export const fetchSong = (song) => {
  return { type: FetchSong, song };
};

export const deleteSong = (song) => {
  return { type: DeleteSong, song };
};

export const updateSong = (song) => {
  return { type: UpdateSong, song };
};

export const addPart = (part) => {
  return { type: AddPart, part }
}

export const addSong = (song) => {
  return { type: AddSong, song }
}

export const addAudio = (audio) => {
  return {type: AddAudio, audio}
}

// thunks

export const addAudioThunk = (audio) => {
  return function (dispatch) {
    dispatch(addAudio(audio));
  }
}

export const fetchSongThunk = (id) => {
  return async function (dispatch) {
    try {
      let response = await axios.get(`/api/songs/${id}`);
      let song = response.data;
      // includes Songs, Parts, and Users as Members
      dispatch(fetchSong(song));
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

export const addSongThunk = (song) => {
  return async function (dispatch) {
    try {
      let response = await axios.post(`/api/songs/add`, song);
      let newSong = response.data;
      dispatch(addSong(newSong));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addPartThunk = (part) => {
  return async function (dispatch) {
    try {
      let response = await axios.post(`/api/parts/add/${part.songId}/${part.userId}/${part.bandId}`, part);
      let newPart = response.data;
      dispatch(addPart(newPart));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function songReducer(state = initialState, action) {
  switch (action.type) {
    case FetchSong:
      state.song = action.song;
      state.parts = action.song.parts
      return {...state};
    case AddPart:
      state.song = {...state.song, parts: [...state.song.parts, action.part]};
      return {...state};
    case DeleteSong:
      return initialState;
    case UpdateSong:
      state.song = action.song;
      state.parts = action.song.parts
      return {...state};
    case AddSong:
      state.song = action.song;
      return {...state};
    case AddAudio:
      state.audio = [...state.audio, action.audio];
      return {...state};
    default:
      return state;
  }
}

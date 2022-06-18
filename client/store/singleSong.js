import axios from "axios";


const initialState = {
  song: {},
  currentPart: 0,
  parts: [],
  repeat: false,
  random: false,
  playing: false,
  audio: null,
};

const FetchSong = "FETCH_SONG";
const DeleteSong = "DELETE_SONG";
const UpdateSong = "UPDATE_SONG";
const SET_CURRENT_PART = "SET_CURRENT_PART";
const TOGGLE_RANDOM = "TOGGLE_RANDOM";
const TOGGLE_REPEAT = "TOGGLE_REPEAT";
const TOGGLE_PLAYING = "TOGGLE_PLAYING";


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
      let song = response.data;
      // includes Songs, Parts, and Users as Members
      dispatch(fetchSong(song));
    } catch (err) {
      console.log(err);
    }
  };
};

// Set playing state
export const togglePlaying = () => {
  return function (dispatch) {
  dispatch({ type: TOGGLE_PLAYING, data: state.playing ? false : true });
  }
}
// Set current part
export const SetCurrent = (id) => {
  return function (dispatch) {
    dispatch({ type: SET_CURRENT_PART, data: id });
  }
}

// Prev song
export const prevPart = () => {
  if (state.currentPart === 0) {
    SetCurrent(state.songs.length - 1);
  } else {
    SetCurrent(state.currentPart - 1);
  }
};
// Next song
export const nextPart = () => {
  if (state.currentPart === state.songs.length - 1) {
    SetCurrent(0);
  } else {
    SetCurrent(state.currentPart + 1);
  }
};

// Repeat and Random
export const toggleRepeat = (id) => {
  return function (dispatch) {
  dispatch({ type: TOGGLE_REPEAT, data: state.repeat ? false : true });
  }
}
export const toggleRandom = (id) => {
  return function (dispatch) {
  dispatch({ type: TOGGLE_RANDOM, data: state.random ? false : true });
  }
}

// End of Song
export const handleEnd = () => {
  // Check for random and repeat options
  if (state.random) {
    return dispatch({
      type: SET_CURRENT_PART,
      data: ~~(Math.random() * state.songs.length),
    });
  } else {
    if (state.repeat) {
      nextPart();
    } else if (state.currentPart === state.songs.length - 1) {
      return;
    } else {
      nextPart();
    }
  }
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

export default function songReducer(state = initialState, action) {
  switch (action.type) {
    case FetchSong:
      state.song = action.song;
      state.parts = action.song.parts
      return {...state};
    case DeleteSong:
      return initialState;
    case UpdateSong:
      state.song = action.song;
      state.parts = action.song.parts
      return {...state};
    case SET_CURRENT_PART:
      state.currentPart = action.data;
      state.playing = true;
      return {...state};
    case TOGGLE_RANDOM:
      state.random = action.data
      return {...state};
    case TOGGLE_REPEAT:
      state.action = action.data;
      return {
        ...state
      };
    case TOGGLE_PLAYING:
      state.playing = action.data;
      return {
        ...state
      };
    default:
      return state;
  }
}

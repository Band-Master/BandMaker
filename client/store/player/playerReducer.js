import axios from "axios";
import {
  SET_CURRENT_PART,
  TOGGLE_RANDOM,
  TOGGLE_REPEAT,
  TOGGLE_PLAYING,
  SET_PARTS_ARRAY,
} from "./types";

const initialState = {
  song: {},
  currentPart: 0,
  parts: [],
  repeat: false,
  random: false,
  playing: false,
  audio: null,
};

//action creator for parts list
export const partsListAction = (parts) => {
  return { type: SET_CURRENT_PART, data: parts };
};

// Thunks
// Set parts array
export const setPartsThunk = (songId) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/api/songs/${songId}`);
      const parts = response.parts;
      dispatch(partsListAction(parts));
    } catch (error) {}
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

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PARTS_ARRAY:
      return {
        ...state,
        parts: action.data,
      };
    case SET_CURRENT_PART:
      return {
        ...state,
        currentPart: action.data,
        playing: true,
      };
    case TOGGLE_RANDOM:
      return {
        ...state,
        random: action.data,
      };
    case TOGGLE_REPEAT:
      return {
        ...state,
        repeat: action.data,
      };
    case TOGGLE_PLAYING:
      return {
        ...state,
        playing: action.data,
      };
    default:
      return state;
  }
}

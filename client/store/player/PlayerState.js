// import React, { useReducer } from "react";
// import playerContext from "./playerContext";
// import playerReducer from "./playerReducer";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   SET_CURRENT_PART,
//   TOGGLE_RANDOM,
//   TOGGLE_REPEAT,
//   TOGGLE_PLAYING,
//   SET_PARTS_ARRAY,
// } from "./types";

// const PlayerState = (props) => {
//   const initialState = {
//     currentPart: 0,
//     parts: [],
//     repeat: false,
//     random: false,
//     playing: false,
//     audio: null,
//   };
//   const [state, dispatch] = useReducer(playerReducer, initialState);

//   // Set parts array
//   const partsSet = (partArr) =>
//     dispatch({ type: SET_PARTS_ARRAY, data: partArr });
//   // Set playing state
//   const togglePlaying = () =>
//     dispatch({ type: TOGGLE_PLAYING, data: state.playing ? false : true });
//   // Set current part
//   const SetCurrent = (id) => dispatch({ type: SET_CURRENT_PART, data: id });

//   // Prev song
//   const prevPart = () => {
//     if (state.currentPart === 0) {
//       SetCurrent(state.songs.length - 1);
//     } else {
//       SetCurrent(state.currentPart - 1);
//     }
//   };
//   // Next song
//   const nextPart = () => {
//     if (state.currentPart === state.songs.length - 1) {
//       SetCurrent(0);
//     } else {
//       SetCurrent(state.currentPart + 1);
//     }
//   };

//   // Repeat and Random
//   const toggleRepeat = (id) =>
//     dispatch({ type: TOGGLE_REPEAT, data: state.repeat ? false : true });
//   const toggleRandom = (id) =>
//     dispatch({ type: TOGGLE_RANDOM, data: state.random ? false : true });

//   // End of Song
//   const handleEnd = () => {
//     // Check for random and repeat options
//     if (state.random) {
//       return dispatch({
//         type: SET_CURRENT_PART,
//         data: ~~(Math.random() * state.songs.length),
//       });
//     } else {
//       if (state.repeat) {
//         nextPart();
//       } else if (state.currentPart === state.songs.length - 1) {
//         return;
//       } else {
//         nextPart();
//       }
//     }
//   };

//   return (
//     <playerContext.Provider
//       value={{
//         currentPart: state.currentPart,
//         parts: state.parts,
//         partslist: state.partslist,
//         repeat: state.repeat,
//         random: state.random,
//         playing: state.playing,
//         audio: state.audio,
//         nextPart,
//         prevPart,
//         SetCurrent,
//         toggleRandom,
//         toggleRepeat,
//         togglePlaying,
//         handleEnd,
//         partsSet,
//       }}
//     >
//       {props.children}
//     </playerContext.Provider>
//   );
// };

// export default PlayerState;

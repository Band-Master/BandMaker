import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  nextPart,
  prevPart,
  toggleRandom,
  toggleRepeat,
  togglePlaying,
  handleEnd,
  setPartsThunk,
} from "../../store/singleSong";

function Controls({props}) {
  // Global State
  const { currentPart, repeat, random, playing } = props
  const { parts } = props.song;

  const audio = useRef("audio_tag");
  
  // self State
  const [statevolum, setStateVolum] = useState(0.3);
  const [dur, setDur] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + ~~s;
  };
  
  const toggleAudio = () =>
  audio.current.paused ? audio.current.play() : audio.current.pause();
  
  const handleVolume = (q) => {
    setStateVolum(q);
    audio.current.volume = q;
  };
  
  const handleProgress = (e) => {
    let compute = (e.target.value * dur) / 100;
    setCurrentTime(compute);
    audio.current.currentTime = compute;
  };
  
  useEffect(() => {
    if (playing) {
      audio.current.volume = statevolum;
      toggleAudio();
    }
    console.log(currentPart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPart]);

  if(parts) {
    console.log("parts and currentPart from controls", parts, currentPart);
    return (
      <div className="controls">
        <audio
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onCanPlay={(e) => setDur(e.target.duration)}
          onEnded={handleEnd}
          ref={audio}
          type="audio/mpeg"
          preload="true"
          src={parts[currentPart].audioUrl}
        />
        <div className="vlme">
          <span className="volum">
            <i className="fas fa-volume-down"></i>
          </span>
          <input
            value={Math.round(statevolum * 100)}
            type="range"
            name="volBar"
            id="volBar"
            onChange={(e) => handleVolume(e.target.value / 100)}
          />
        </div>
        <div className="musicControls">
          <span className="prev" onClick={prevPart}>
            <i className="fas fa-step-backward"></i>
          </span>

          <span
            className="play"
            onClick={() => {
              togglePlaying();
              toggleAudio();
            }}
          >
            <span className={!playing ? "" : "hide"}>
              <i className="fas fa-play"></i>
            </span>
            <span className={!playing ? "hide" : ""}>
              <i className="fas fa-pause"></i>
            </span>
          </span>

          <span className="next" onClick={nextPart}>
            <i className="fas fa-step-forward"></i>
          </span>
        </div>

        <div className="progressb">
          <div className="songMeta">
            <span className="songtitle">{parts[currentPart].name}</span>
            {/* <span className="songartistName">{parts[currentPart].user}</span> */}
          </div>
          <input
            onChange={handleProgress}
            value={dur ? (currentTime * 100) / dur : 0}
            type="range"
            name="progresBar"
            id="prgbar"
          />
          <span className="currentT">{fmtMSS(currentTime)}</span>/
          <span className="totalT">{fmtMSS(dur)}</span>
        </div>
        <div className="plsoptions">
          <span
            onClick={toggleRandom}
            className={"random " + (random ? "active" : "")}
          >
            <i className="fas fa-random"></i>
          </span>
          <span
            onClick={toggleRepeat}
            className={"repeat " + (repeat ? "active" : "")}
          >
            <i className="fas fa-redo-alt"></i>
          </span>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Controls;

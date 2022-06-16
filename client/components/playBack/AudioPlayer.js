import React from "react";

const AudioPlayer = () => {
  return (
    <div className="audioplayer">
      <div className="inside_content">
        <Header />
        <Actions />
        <Playlist />
      </div>
      {/* <Controls /> */}
    </div>
  );
};

export default AudioPlayer;

import React, { useContext } from "react";
import playerContext from "../../context/playerContext";

function Header() {
  const { currentSong, songs } = useContext(playerContext);

  return (
    <header className="draggable">
      <h3>ReactWave</h3>
    </header>
  );
}

export default Header;

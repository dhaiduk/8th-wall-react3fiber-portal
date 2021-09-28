import React, { useRef, useEffect } from "react";
import "./styles.css";
import recenterImage from "../src/images/recenter.png";
import useStore from "./state";
import useSound from "use-sound";
import "./styles.css";
import popNoise from "./audio/showContentInfo.mp3";


const MainScreenOverlays = (props) => {
  const [thepopNoise] = useSound(popNoise, {
    volume: 1.18,
  });

  const { setrecenterAwaiting } = useStore();
  const { boundsWarning } = useStore();
  const { doBoundsWarning } = useStore();
  const { recenterAwaiting } = useStore();
  const { hasFirstPlacement, sethasFirstPlacement } = useStore();
  const recenterGroupDiv = useRef();
  const recenterBtn = document.getElementById("recenterButton");
  const outofboundsText = document.getElementById("outofboundsText");
  const { XR8 } = window; //no state ref needed right ?!

  useEffect(() => {
    if (recenterAwaiting) {
      thepopNoise();

      recenterBtn.classList.add("pulse-once");
      setTimeout(() => {
        recenterBtn.classList.remove("pulse-once");
      }, 200);

      setrecenterAwaiting(false);

      XR8.xrController().recenter();
    }
  });

  function doRecenterYes() { 
    setrecenterAwaiting(true);
  }

  function DoGiveUserMessage(props) {
    return (
      <div id="promptText">
        {props.line1}
        <br />
        {props.line2}
      </div>
      //   USE CLASSES  ('fly-out')   ('fly-in')
    );
  }

  return (
    <div>
      {boundsWarning && <DoGiveUserMessage line1="Out Of Bounds" line2={"Go "+boundsWarning} />}

      {hasFirstPlacement && (
        <div
          id="recenterButton"
          ref={recenterGroupDiv}
          onClick={doRecenterYes}
          className="recentercontainer"
        >
          <img className="myImage" src={recenterImage} alt="recenter logo" />
        </div>
      )}
    </div>
  );
};

export default MainScreenOverlays;

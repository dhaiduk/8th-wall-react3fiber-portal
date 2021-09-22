import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { withLauncher } from "../Component";
import { withContext } from "./ContextProvider";
import useContext from "./hooks/useContext";
import XR3F from "./XR3F";
import FullWindowCanvas from "../FullWindowCanvas";
import "../styles.css";
import MainScreenOverlays from "../divOverlayParts"; 
import { GenTools } from "../genTools";
import useStore from "../state";

const Component = ({ XR8, xr8Config, onComplete, backgroundImage }) => {
  const { updateCtx } = useContext();

  useEffect(() => {
    if (XR8) {
      updateCtx({ XR8 });
    }
  }, [XR8, updateCtx]);

  return (
    <group>
      <MainScreenOverlays />
      <Canvas
        concurrent={true}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          left: "0px",
          top: "0px",
          zIndex: 100
        }}
        raycaster={{ filter: (intersects, state) => intersects.slice(0, 1) }}
        shadows
        shadowMap
        updateDefaultCamera={false}
        camera={{ position: [0, 0, 5], fov: 60 }}
      >
        <XR3F name={"xr-three"} updateCtx={updateCtx}></XR3F>
        <FullWindowCanvas /> 
      </Canvas>
    </group>
  );
};

export default withContext(withLauncher(Component));

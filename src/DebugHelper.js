import React, { Suspense, useRef } from "react";
import { Html, Box } from "@react-three/drei";
import useStore from "./state";

function DebugHelper(props) {
  const { DebugWanted } = useStore();
  const hellotext = useRef();

  return (
    <group visible={DebugWanted}>
      <group>
        <group name="wireframebox">
          <Box color={"blue"}>
            <meshBasicMaterial wireframe color="green" />
          </Box>
        </group>
        <group name="drietexts">{/* <html>{hellotext}</html> */}</group>
      </group>
    </group>
  );
}

export default DebugHelper;

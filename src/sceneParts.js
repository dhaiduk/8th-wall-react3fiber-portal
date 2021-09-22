import React, { Suspense, useEffect, useRef, useState } from "react";
import Elevator from "./Elevator2";
import Elevatorxx from "./Modelz/Elevatornew2";
import Wheel from "./Wheelfortune.js";
import { Html, Environment, Box } from "@react-three/drei";
import useStore from "./state";
import * as THREE from "three";
import { GenTools } from "./GenTools";
import CharacterVid from "./Component/elements/CharacterVid";
import { gsap } from "gsap";
import { Text, useTexture } from "@react-three/drei";
function MyBox(...props) {
  const ref = useRef();
  return (
    <Suspense>
      <mesh position={[0, -3.5, -4.3]} ref={ref} scale={5}>
        <boxGeometry />
        <meshStandardMaterial color={"black"} />
      </mesh>
    </Suspense>
  );
}
function MyBox2(...props) {
  const ref = useRef();
  return (
    <Suspense>
      <mesh position={[0, -3.5, -8.8]} ref={ref} scale={5}>
        <boxGeometry />
        <meshStandardMaterial color={"black"} />
      </mesh>
    </Suspense>
  );
}
function MyflatText({ ...props }) {
  return (
    <group name="MyflatText" {...props}>
      {/* <Text
        font="./Inter-Bold.woff"
        fontSize={2}
        letterSpacing={-0.06}
        {...props}
      >
        2D Text
        <meshBasicMaterial color="green" />
      </Text> */}
    </group>
  );
}
const sceneParts = ({ name, updateCtx }) => {
  const refelevatorgroup = useRef();
  const myMesh = useRef();
  const viddRef = useRef();
  const floor = useStore((state) => state.floor);
  const doorOpener = useStore((state) => state.doorOpener);
  const raiser = useStore((state) => state.triggerRaiser);
  const { modelNum } = useStore();
  const {
    hasFirstPlacement,
    floorClickedX,
    floorClickedY,
    floorClickedZ,
  } = useStore();

  const [mytextX, setMyTextX] = useState("");
  const [mytextY, setMyTextY] = useState("--Y:");
  const [mytextZ, setMyTextZ] = useState("--Z:");

  useEffect(() => {
    setMyTextX("X: " + floorClickedX);
    setMyTextY("Y: " + floorClickedY);
    setMyTextZ("Z: " + floorClickedZ);
  });
  // setText("i am set text");

  useEffect((state, delta) => {
    console.log(
      "floor:" +
        floor +
        " raiser:" +
        raiser +
        " doorOpener:" +
        doorOpener +
        " hasFirstPlacement:" +
        hasFirstPlacement
    );

    if (raiser) {
      setTimeout(() => {
        // clearRaiser(); //not needed I think
      }, 2000);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <group visible={GenTools.ParamsGet("portal")} name="FOR-DEBUG">
        <group name="wireframebox">
          {/* <Box color={"blue"}>
            <meshBasicMaterial ref={myMesh} wireframe color="blue" />
          </Box> */}
        </group>
        {/* <group style={{ color: "blue", "font-weght": 400 }} name="drietexts">
          <Html>
            <h4> x:{mytextX} </h4>
            <p> {mytextY} </p>
            <p> {mytextZ} </p>
          </Html>
        </group> */}
        <group position={[0, 0, 0]}>{/* <MyflatText /> */}</group>
      </group>
      <MyflatText />

      <ambientLight intensity={1.3} />
      <spotLight
        intensity={1.6}
        position={[20, 10, 10]}
        angle={0.2}
        penumbra={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        castShadow
      />

      <Suspense
        fallback={
          <Html>
            <h1 style={{ color: "white" }}>Loading...</h1>
          </Html>
        }
      >
        {floor === 1 && (
          <group
            visible={floor === 1 ? true : false}
            position={[0, 0, 0]}
            scale={[0.5, 0.5, 0.5]}
          >
            <MyBox />
            <Suspense fallback={<Html></Html>}>
              <Wheel
                position={[0, 0, 0]}
                scale={[1, 1, 1]}
                rotation={[0, 0, 0]}
              />
              <MyBox2 />
            </Suspense>
            <Suspense fallback={<Html></Html>}>
              <Environment preset={"night"} background />
            </Suspense>
            <group position={[0, 2, -1.3]} scale={[3, 3, 3]}>
              <Suspense fallback={<Html></Html>}>
                <CharacterVid
                  ref={viddRef}
                  position={[0, 0, 0]}
                  rotation={[0, Math.PI / 2, 0]}
                />
              </Suspense>
            </group>
          </group>
        )}

        {floor === 2 && (
          <group>
            {/* <MyFlock/> */}
            <Suspense fallback={<Html></Html>}>
              <Environment preset={"city"} background />
            </Suspense>
          </group>
        )}

        {floor === 3 && (
          <group>
            <Suspense fallback={<Html></Html>}>
              <Environment preset={"dawn"} background />
            </Suspense>
          </group>
        )}

        {GenTools.ParamsGet("portal") === "a" && (
          <group
            ref={refelevatorgroup}
            position={[0, -0.02, 0]}
            scale={[0.045, 0.08, 0.045]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <Elevator />
          </group>
        )}

        {!GenTools.ParamsGet("portal") && (
          <Suspense fallback={<Html>Loading..</Html>}>
            <group
              ref={refelevatorgroup}
              position={[0, 1.45, 0]}
              rotation={[0, 0, 0]}
            >
              <Elevatorxx scale={[1.8, 1.8, 1.8]} />
            </group>
          </Suspense>
        )}
      </Suspense>
    </group>
  );
};

export default sceneParts;

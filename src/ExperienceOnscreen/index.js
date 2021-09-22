import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Box } from "@react-three/drei";
import "../styles.css";
import useStore from "../state";
import SceneParts from "../sceneParts";
import * as THREE from "three";
import { useTexture, Html } from "@react-three/drei";

function MyBox() {
  const myytexture = useTexture("./manu.png");

  const ref = useRef();
  return (
    <Suspense>
      <mesh position={[0, 0, 0]} ref={ref} scale={20}>
        <boxGeometry />
        <meshStandardMaterial color={"blue"} map={myytexture} />
      </mesh>
    </Suspense>
  );
}

export default function App() {
  const { turnDebugOn } = useStore();
  const { hasPlacedRoutine } = useStore();
  const { hasFirstPlacement } = useStore();

  useEffect(() => {
    if (!hasFirstPlacement) {
      hasPlacedRoutine();
    }
  });

  // alert("click now for audio");
  return (
    <Canvas
      style={{ height: "100vh", width: "100%" }}
      shadowMap
      concurrent
      shadows
      gl={{ alpha: false }}
      camera={{
        position: [0, 1, 1],
        rotation: [0, 1, 0],
        fov: 75
      }}
    >
      <group>
        <mesh
          name="floormeshsurface"
          // onPointerDown={alert("click1234")}
          receiveShadow
          position={[0, 0, 0]}
          // ref={$surface}
          rotation-x={-Math.PI / 2}
        >
          <planeGeometry attach="geometry" args={[100, 100, 1, 1]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
        <Suspense>{/* <MyBox /> */}</Suspense>
        <group position={[0, 0, 0]}>
          <mesh
            castShadow
            // position={tapTarget}
            // visible={!!tapTarget}
            // ref={$box}ftapt
          ></mesh>
        </group>
      </group>
      <SceneParts />
      <ambientLight intensity={1.3} />
      <OrbitControls target={[0, 1, 0.01]} />
      <Stars />
    </Canvas>
  );
}

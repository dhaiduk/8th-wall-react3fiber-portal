import React, { useEffect, useState, useRef } from "react";
import { Plane } from "@react-three/drei";
import useStore from "../../state";
import { useAspect } from "@react-three/drei";
import * as THREE from "three";
import { GenTools } from "../../GenTools";

function CharacterVid() {
  const size = useAspect(1800, 1000);
  const { characterWelcomeVideoFinished } = useStore();
  const { setWelcomeVideoFinished } = useStore();

  const myvidtexture = useRef();

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "/assets/videos/donnashort.mp4";

    vid.crossOrigin = "Anonymous";
    vid.loop = false;
    vid.muted = false;
    vid.preload = true;
    vid.playsinline = true;
    if (characterWelcomeVideoFinished) {
      vid.src = "/assets/videos/donnaidle.mp4";
      vid.loop = true;
      vid.play();
    }
    vid.onended = function() { 
      setWelcomeVideoFinished();
    };
    return vid;
  });

  useEffect(() => {
    let timer1 = setTimeout(() => video.play([video]), 3.5 * 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const TorusShaderMaterial = {
    uniforms: {
      u_time: { type: "f", value: 0 },
    },
    vertexShader: `
      precision mediump float;
      varying vec2 vUv;
      void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
          gl_Position = projectionMatrix * mvPosition;
          vUv = uv;
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float u_time;
      void main() {
        vec2 uv = vUv;
        float cb = floor((uv.x + u_time) * 40.);
        gl_FragColor = vec4(mod(cb, 2.0),0.,0.,1.);
      }
    `,
  };

  return (
    <group scale={(1, 1, 1)} position={[0, -0.4, 0]}>
      <mesh scale={size} position={[0, -0.12, -0.5]}>
        <planeBufferGeometry args={[0.1, 0.3]} />
        <meshBasicMaterial position={[1, 1, 1]} toneMapped={false}>
          <videoTexture
            ref={myvidtexture}
            attach="map"
            args={[video]}
            encoding={THREE.sRGBEncoding}
          >
            <shaderMaterial attach="material" args={[TorusShaderMaterial]} />
            {/* <shaderMaterial
              attach="material"
              args={[
                {
                  uniforms: GenTools.getUniforms(myvidtexture),
                  vertexShader: GenTools.getVertexShader(),
                  fragmentShader: GenTools.getFragmentShaderChroma(),
                  transparent: true
                }
              ]}
            /> */}
          </videoTexture>
        </meshBasicMaterial>
      </mesh>
    </group>
  );
}

export default CharacterVid;

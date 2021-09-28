import React, { useEffect, useState, useRef } from "react";
import { Plane } from "@react-three/drei";
import useStore from "../../state";
import { useAspect } from "@react-three/drei";
import * as THREE from "three";
import { GenTools } from "../../GenTools";
import { VideoTexture } from "three";

const url = "donnashort.mp4";
function getUniforms(videoTexture) {
  var uniforms = {
    colorTexture: { value: videoTexture },
    glow: { value: 0.0 },
    glowColour: { value: { x: 0.0, y: 1.0, z: 0.0, w: 1.0 } },
  };
  return uniforms;
}
function getFragmentShader() {
  let keycol = "vec3(0.0,1.0,0.0)"; // Green
  let keycolind = "g"; // Green (set to "b" for blue
  let sharpness = "3.0";

  return (
    `    
      uniform sampler2D colorTexture;
      varying vec2 vUv;
      uniform float glow;
      uniform vec4 glowColour;                     
      
      void main( void ) {
              const float radius = 0.003;
              vec4 cs1 = texture2D( colorTexture, vUv );
              vec4 cs2 = texture2D( colorTexture, vUv + vec2(-radius, -radius));
              vec4 cs4 = texture2D( colorTexture, vUv + vec2(radius, radius));
              
              vec4 c = (cs1 + cs2 + cs4) / 3.0;
      
              vec3 color = ` +
    keycol +
    `;
              float a = (0.875 - dot(color, c.rgb) / (length(c.rgb) + 0.04)) * 4.0;
              a = pow(a,` +
    sharpness +
    `);
              vec4 c2 = vec4(mix(cs1.rgb, glowColour.rgb, glow), a);
              float deltag = c2.` +
    keycolind +
    ` - ((c2.r + c2.g + c2.b)*0.333);
      
              if (deltag > 0.0)
                  c2.` +
    keycolind +
    ` -= (deltag*1.0);

              gl_FragColor = c2;


      }`
  );
}
function getVertexShader() {
  return `    
      varying vec2 vUv;
      void main()
      {
      vUv = uv;
      vUv.x = mix(0.0,1.0,uv.x);
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_Position = projectionMatrix * mvPosition;
      }`;
}
const Texture = ({ texture }) => {
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[16, 9]} />
      <shaderMaterial
        attach="material"
        transparent
        args={[
          {
            vertexShader: getVertexShader(),
            fragmentShader: getFragmentShader(),
            uniforms: getUniforms(texture),
          },
        ]}
        uniforms-colorTexture-value={texture}
      />
    </mesh>
  );
};
const Video = ({ video }) => {
  const front = new VideoTexture(video.current);
  return <Texture texture={front} />;
};

function CharacterVid() {
  const size = useAspect(1800, 1000);
  const { characterWelcomeVideoFinished } = useStore();
  const { setWelcomeVideoFinished } = useStore();

  const videoRef = useRef(null);
  // useEffect(() => {
  //   videoRef.current.play();
  // }, [videoRef]);

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
            ref={videoRef}
            attach="map"
            args={[video]}
            encoding={THREE.sRGBEncoding}
          >
            {/* <shaderMaterial attach="material" args={[TorusShaderMaterial]} /> */}
            {/* <shaderMaterial
              attach="material"
              transparent
              args={[
                {
                  uniforms: GenTools.getUniforms(videoRef.current),
                  vertexShader: GenTools.getVertexShader(),
                  fragmentShader: GenTools.getFragmentShaderChroma(),
                  transparent: true,
                },
              ]}
            /> */}
          </videoTexture>
        </meshBasicMaterial>
      </mesh>

      {/* <Video video={videoRef} /> */}
    </group>
  );
}

export default CharacterVid;

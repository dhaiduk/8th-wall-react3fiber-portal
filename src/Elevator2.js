import React, { useRef, useEffect } from "react";
import { useGLTF, Html, Box } from "@react-three/drei";
import useStore from "./state";
import { gsap } from "gsap";
import useSound from "use-sound";
import enterNoise from "./audio/enterGame.mp3";
import liftopen from "./audio/open.mp3";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { GenTools } from "./GenTools";

function setupLightmapShader(node, origMaterial) {
  let baseColour = new THREE.Vector4(
    origMaterial.color.r,
    origMaterial.color.g,
    origMaterial.color.b,
    origMaterial.color.a
  );

  var uniforms = {
    colorTexture: { value: origMaterial.map },
    mainColor: { value: baseColour },
    lightmapTexture: { value: origMaterial.emissiveMap },
    lightmapOffset: { value: origMaterial.emissiveMap.offset },
    lightmapScale: { value: origMaterial.emissiveMap.repeat },
    glow: { value: 0.0 },
    glowColour: { value: { x: 0.0, y: 1.0, z: 0.0, w: 1.0 } }
  };

  var mat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: GenTools.getVertexShader(),
    fragmentShader: GenTools.getFragmentShader(),
    transparent: origMaterial.transparent,
    alphaTest: origMaterial.alphaTest
  });

  node.material = mat;

  setTextureSettingBase(origMaterial.map);
  setTextureSettingLightmap(origMaterial.emissiveMap);
}

function setupUnlitMaterial(node, origMaterial) {
  var mat = new THREE.MeshBasicMaterial({
    map: origMaterial.map,
    color: origMaterial.color,
    transparent: origMaterial.transparent,
    alphaTest: origMaterial.alphaTest
  });

  node.material = mat;

  setTextureSettingBase(origMaterial.map);
}

function setTextureSettingBase(map) {
  map.anisotropy = 8;
  map.minFilter = THREE.LinearMipmapLinearFilter;
  map.encoding = THREE.LinearEncoding;
}

function setTextureSettingLightmap(map) {
  map.encoding = THREE.LinearEncoding;
}

function getVertexShader() {
  return `
        varying vec2 vUv;
        varying vec2 vUv2;
        attribute vec2 uv2;
        uniform vec2 lightmapOffset;
        uniform vec2 lightmapScale;

        void main()
        {
        vUv = uv;
        vUv2 = uv2;
        vUv2 *= lightmapScale;
        vUv2.x += lightmapOffset.x;
        vUv2.y -= lightmapOffset.y;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
    }
    `;
}

function getFragmentShader() {
  return `
        uniform sampler2D colorTexture;
        uniform sampler2D lightmapTexture;
        uniform vec4 mainColor;
        uniform float glow;
        uniform vec4 glowColour;  
        varying vec2 vUv;
        varying vec2 vUv2;

        void main( void ) {

                vec4 c = texture2D( colorTexture, vUv );
                vec4 l = texture2D( lightmapTexture, vUv2 );
                c.rgb *= mainColor.rgb;
                c.rgb *= l.rgb;
                c.rgb = mix(c.rgb, glowColour.rgb, glow);
                gl_FragColor = c;
                gl_FragColor.a = c.a;
        }
    `;
}

export default function Model(props) {
  const { nodes, materials } = useGLTF("/elevator2.glb");
  const { scene } = useThree();
  const doorOpener = useStore(state => state.doorOpener);
  const dodoorOpenr = useStore(state => state.dodoorOpenr);
  const doorCloser = useStore(state => state.doorCloser);
  const triggerRaiser = useStore(state => state.triggerRaiser);
  const group = useRef();
  const upbutton = useRef();
  const leftdoor = useRef();
  const rightdoor = useRef();

  useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh === true) {
        child.frustumCulled = false;

        if (child.material.emissiveMap != null && child.material.map != null) {
          console.log("emissiveMap on: " + child.name);
          setupLightmapShader(child, child.material);
        } else if (child.material.map != null) {
          // No lightmap (maybe for self illuminated things such as lamp shades!
          setupUnlitMaterial(child, child.material);
        }
      }
    });
  }, [scene]);

  const [playenterNoise] = useSound(enterNoise, {
    volume: 0.75
  });

  const [playliftopenAudio] = useSound(liftopen, {
    volume: 0.73
  });
  if (doorOpener) {
    console.log("door open");
    playenterNoise();

    gsap.to(leftdoor.current.position, {
      duration: 1.2,
      delay: 1,
      x: leftdoor.current.position.x,
      y: leftdoor.current.position.y,
      z: 295.13
    });
    gsap.to(rightdoor.current.position, {
      duration: 1.2,
      delay: 1,
      x: rightdoor.current.position.x,
      y: rightdoor.current.position.y,
      z: 295.13
    });


  }

  if (doorCloser) {
    console.log("door close");
    gsap.to(leftdoor.current.position, {
      duration: 2,
      z: 125.13
    });
    gsap.to(rightdoor.current.position, {
      duration: 2,
      z: 125.13
    });
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.1, 0.1, 0.1]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[299, 170, 318]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[2.53, 14.59, 13.76]}
          >
            <mesh
              geometry={nodes.B_Down_Material001_0.geometry}
              material={nodes.B_Down_Material001_0.material}
            />
            <mesh
              geometry={nodes.B_Down_Material003_0.geometry}
              material={nodes.B_Down_Material003_0.material}
            />
          </group>
          <group
            ref={upbutton}
            position={[299, 210, 318]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[2.53, 14.59, 13.76]}
          >
            <mesh
              geometry={nodes.B_Up_Material001_0.geometry}
              material={nodes.B_Up_Material001_0.material}
              position={[-15.43, -0.01, 0]}
              rotation={[0, 0, -3.13]}
            />
            <mesh
              geometry={nodes.B_Up_Material003_0.geometry}
              material={nodes.B_Up_Material003_0.material}
              position={[-15.43, -0.01, 0]}
              rotation={[0, 0, -3.13]}
            />
          </group>
          {/* tion={[287.15, 189.52, 125.13]} */}
          <group
            ref={leftdoor}
            position={[287.15, 189.52, 295.13]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[297, 385, 368.28]}
          >
            <mesh
              geometry={nodes.Door__0.geometry}
              material={nodes.Door__0.material}
            />
          </group>
          <group
            ref={rightdoor}
            position={[287.15, 189.52, -295.13]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[297, 385, 368.28]}
          >
            <mesh
              geometry={nodes.Door001__0.geometry}
              material={nodes.Door001__0.material}
            />
          </group>
          <group
            position={[0, 300, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[297, 385, 368.28]}
          >
            <mesh
              geometry={nodes.Elevator_Material001_0.geometry}
              material={nodes.Elevator_Material001_0.material}
            />
            <mesh
              geometry={nodes.Elevator_Material002_0.geometry}
              material={materials["Material.003"]}
            />
            <mesh
              geometry={nodes.Elevator_Material_0.geometry}
              material={materials["Material.001"]}
            />
          </group>
          <group
            position={[298.24, 500, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[2.02, 53.76, 20.8]}
          >
            <mesh
              geometry={nodes.Top__0.geometry}
              material={nodes.Top__0.material}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/elevator2.glb");

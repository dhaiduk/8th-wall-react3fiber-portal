
import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { gsap } from "gsap";   
import useStore from './state';

export default function Model(props) {
  const group = useRef()    
  const masterGroup = useRef()  
  const theWheel = useRef()  
  const { nodes } = useGLTF('/wheelfortune.glb');
  const { doorCloseRoutine } = useStore();

	useEffect(() => {
  
		var tl2 = gsap.timeline();
 
    tl2 
      .to( masterGroup.current.scale, {
        duration:2,  
        delay: 7,
        // ease: "elastic",
        // repeat: 9999,
        x: 1, 
        y: 1, 
        z: 1,
    })

    setTimeout(() => {  
      doorCloseRoutine()
    }, 10000) 
 
	});
 
  return (
    <group ref={masterGroup} scale={[0,0,0]} position={[0,-1,-10]}>
      <group castShadow ref={group} {...props} dispose={null}>
        <group castShadow position={[0, 0, 12.74]} rotation={[-Math.PI / 2, 0, 0]}>
          <group castShadow rotation={[Math.PI / 2, 0, 0]}>

            <group  position={[0, 4.03, -12.2]} rotation={[-Math.PI, 0, -Math.PI]} scale={[1.5, 1.5, 1.5]}>
              <group position={[-0.64, 1.26, -0.16]} rotation={[-3.14, 0, 2.66]} scale={[2, 2, 2]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_2.geometry} material={nodes.Mesh_2.material} />
              </group>
              <group position={[1.4, -0.15, -0.17]} rotation={[3.14, -0.01, -1.54]} scale={[2, 2, 2]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_11.geometry} material={nodes.Mesh_11.material} />
              </group>
              <group position={[1.35, 0.4, -0.17]} rotation={[3.14, -0.01, -1.83]} scale={[2, 2, 2]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_12.geometry} material={nodes.Mesh_12.material} />
              </group>
              <group position={[1.12, 0.93, -0.2]} rotation={[-3.1, -0.07, -2.17]} scale={[2, 2, 2]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_13.geometry} material={nodes.Mesh_13.material} />
              </group>
              <group position={[0.54, 1.33, -0.22]} rotation={[3.04, -0.02, -2.7]} scale={[2, 2, 2]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_14.geometry} material={nodes.Mesh_14.material} />
              </group>
              <group position={[-1.06, 0.91, -0.16]} rotation={[-3.14, 0, 2.23]} scale={[2, 2, 2]}>
                <mesh castShadow geometry={nodes.Mesh_3.geometry} material={nodes.Mesh_3.material} />
              </group>
              <group position={[-1.31, 0.44, -0.16]} rotation={[-3.14, 0.01, 1.89]} scale={[2, 2, 2]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_4.geometry} material={nodes.Mesh_4.material} />
              </group>
              <group position={[-1.33, -0.2, -0.16]} rotation={[-3.14, 0.01, 1.35]} scale={[2, 2, 2]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_5.geometry} material={nodes.Mesh_5.material} />
              </group>
              <group position={[-1.08, -0.83, -0.17]} rotation={[-3.13, 0.01, 0.88]} scale={[2, 2, 2]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_6.geometry} material={nodes.Mesh_6.material} />
              </group>
              <group position={[-0.52, -1.21, -0.17]} rotation={[-3.13, 0, 0.35]} scale={[2, 2, 2]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_7.geometry} material={nodes.Mesh_7.material} />
              </group>
              <group position={[0.12, -1.31, -0.17]} rotation={[-3.13, 0, 0]} scale={[2, 2, 2]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_8.geometry} material={nodes.Mesh_8.material} />
              </group>
              <group position={[0.59, -1.19, -0.17]} rotation={[-3.13, -0.01, -0.43]} scale={[2, 2, 2]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_9.geometry} material={nodes.Mesh_9.material} />
              </group>
              <group position={[1.11, -0.76, -0.17]} rotation={[-3.14, -0.01, -0.89]} scale={[2, 2, 2]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_10.geometry} material={nodes.Mesh_10.material} />
              </group>
              <group position={[-0.13, 1.43, -0.16]} rotation={[3.14, 0, 3.05]} scale={[2, 2, 2]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_1.geometry} material={nodes.Mesh_1.material} />
              </group>
              <mesh geometry={nodes.Mesh_0.geometry} material={nodes.Mesh_0.material} />
              <group position={[0, 2.03, 0.15]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_15.geometry} material={nodes.Mesh_15.material} />
              </group>
              <group position={[0, -2.73, 0.23]}>
                <mesh castShadow receiveShadow geometry={nodes.Mesh_16.geometry} material={nodes.Mesh_16.material} />
              </group>
            </group>
         
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/wheelfortune.glb')

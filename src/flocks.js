import React , {  useState, useEffect, Suspense, useRef} from 'react';
import { useFrame } from "@react-three/fiber"
import { Html  } from '@react-three/drei';    
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber' 

function Bird({ speed, factor, url, ...props }) {
  const { nodes, materials, animations } = useLoader(GLTFLoader, url)
  const group = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())

  useEffect(() => void mixer.clipAction(animations[0], group.current).play(), [])

  useFrame((state, delta) => {
    group.current.rotation.y += Math.sin((delta * factor) / 2) * Math.cos((delta * factor) / 1) * 1.5
    mixer.update(delta * speed)
  })

  return (
    <group ref={group} dispose={null}>
      <scene name="Scene" {...props}>
        <mesh
          name="Object_0"
          morphTargetDictionary={nodes.Object_0.morphTargetDictionary}
          morphTargetInfluences={nodes.Object_0.morphTargetInfluences}
          rotation={[1.5707964611537577, 0, 0]}
          geometry={nodes.Object_0.geometry}
          material={materials.Material_0_COLOR_0}
        />
      </scene>
    </group>
  )
}
function Birds() {
  return new Array(20).fill().map((_, i) => {
    const x = (15 + Math.random() * 30) * (Math.round(Math.random()) ? -1 : 1)
    const y = -10 + Math.random() * 20
    const z = -5 + Math.random() * 10
    const bird = ['Stork', 'Parrot', 'Flamingo'][Math.round(Math.random() * 2)]
    let speed = bird === 'Stork' ? 0.5 : bird === 'Flamingo' ? 2 : 5
    let factor = bird === 'Stork' ? 0.5 + Math.random() : bird === 'Flamingo' ? 0.25 + Math.random() : 1 + Math.random() - 0.5
    return <Bird key={i} position={[x, y, z]} rotation={[0, x > 0 ? Math.PI : 0, 0]} speed={speed} factor={factor} url={`/${bird}.glb`} />
  })
}

function MyFlock(props){
     
    return (
  
        <Suspense fallback={<Html><h1 style={{color:'blue'}}>Loading...</h1></Html>}>  
          <Birds/>
        </Suspense>
 
    )
}
 
export default MyFlock  
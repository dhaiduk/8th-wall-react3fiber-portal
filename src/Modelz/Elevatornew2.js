import React, { useRef, useEffect } from "react";
import { useGLTF, Html, Box } from "@react-three/drei";
import useStore from "../state";
import { gsap } from "gsap";
import useSound from "use-sound";
import enterNoise from "../audio/enterGame.mp3";
import liftopen from "../audio/open.mp3";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { GenTools } from "../GenTools";

export default function Model(props) {
  const group = useRef();
  const masterGroup = useRef();
  const leftDoorA = useRef();
  const leftDoorB = useRef();
  const floor = useStore(state => state.floor);
  const rightDoorA = useRef();
  const doorOPenButton = useRef();
  const { nodes, materials } = useGLTF("/elevatornew2.glb");
  const doorOpener = useStore(state => state.doorOpener);
  const { dodoorOpenr } = useStore();
  const { hasFirstPlacement } = useStore();
  const { turnDebugOn } = useStore();
  const { DebugWanted } = useStore();

  const [playliftopenAudio] = useSound(liftopen, {
    volume: 0.73
  });
  const [playenterNoise] = useSound(enterNoise, {
    volume: 0.6
  });

  useEffect(() => {
    var tl2 = gsap.timeline();
    var duractionAElevatorIn = 0.7;
    var debugYes = GenTools.ParamsGet("debug");
    if (debugYes) {
      //  turnDebugOn();
    }

    if (hasFirstPlacement) {
      if (!doorOpener) {
        tl2.to(masterGroup.current.scale, {
          duration: duractionAElevatorIn,
          x: 1,
          z: 1,
          y: 1
        });
        // tl2.to(masterGroup.current.position, {
        //   duration: duractionAElevatorIn,
        //   // y: 0.1
        //   // z: 0.5
        // });

        var leftDoorclose = gsap.timeline();

        leftDoorclose.to(leftDoorA.current.position, {
          duration: 2.5,
          delay: 5,
          x: -0.22
        });

        // setTimeout(() => {
        //   playliftopenAudio(); //not truly stateful TODO
        // }, 6300);

        var rightDoorclose = gsap.timeline();

        rightDoorclose.to(rightDoorA.current.position, {
          duration: 2.5,
          delay: 5,
          x: 0.21
        });
      }
    }

    if (doorOpener) {
      playenterNoise();

      var xdoorOpenerButton = gsap.timeline();

      xdoorOpenerButton.from(doorOPenButton.current.position, {
        duration: .2,
        x:1, 
      }); 

      var xleftDooropen = gsap.timeline();

      xleftDooropen.to(leftDoorA.current.position, {
        duration: 2.5,
        delay: 3.5,
        x: -1
      });

      var xrightDooropen = gsap.timeline();

      xrightDooropen.to(rightDoorA.current.position, {
        duration: 2.5,
        delay: 3.5,
        x: 1
      });
 
    }
  });

  function doPressedButton(e) {
    dodoorOpenr();
  }

  return (
    <group ref={masterGroup} scale={[0, 0, 0]} position={[0, 0.1, 0.5]}>
      <group ref={group} {...props} dispose={null}>
        <group
          ref={leftDoorA}
          position={[-1.22, 0.23, -0.8]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            geometry={nodes.Door_Left.geometry}
            material={materials.doors_lift}
            position={[0, 0, 0.31]}
            scale={[0.08, 0.08, 0.08]}
          />
        </group>
        <group
          ref={rightDoorA}
          position={[0.66, 0.23, -0.79]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            geometry={nodes.Door_Right.geometry}
            material={materials["doors_lift.001"]}
            position={[0, 0, 0.31]}
            scale={[0.08, 0.08, 0.08]}
          />
        </group>
        <group
          position={[0.6, 0.2, -0.71]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.01, 0.01, 0.01]}
        >
          <group
            position={[0.11, 0.5, -20.45]}
            rotation={[0, 0, -Math.PI]}
            scale={[2.02, 0.8, 2.02]}
          >
            <mesh
              geometry={nodes.Butt_alarm_1.geometry}
              material={materials.Butt_alarm_Off}
            />
            <mesh
              geometry={nodes.Butt_alarm_2.geometry}
              material={materials["doors_lift.009"]}
            />
          </group>
          <group
            position={[-3.66, 0.29, 50.32]}
            rotation={[-Math.PI, 0, 0]}
            scale={[1.53, 0.61, 1.53]}
          >
            <mesh
              geometry={nodes.Butt_Close_1.geometry}
              material={materials.Butt_Close_OFF}
            />
            <mesh
              geometry={nodes.Butt_Close_2.geometry}
              material={materials["doors_lift.010"]}
            />
          </group>
          <group
            position={[3.54, 0.29, 50.32]}
            rotation={[-Math.PI, 0, 0]}
            scale={[1.53, 1, 1.53]}
          >
            <mesh
              geometry={nodes.Butt_Open_1.geometry}
              material={materials.Butt_Open_OFF}
            />
            <mesh
              onClick={e => doPressedButton(e)}
              ref={doorOPenButton}
              scale={[2.2, 2.2, 2.2]}
              color={"blue"}
              geometry={nodes.Butt_Open_1.geometry}
              material={materials.Butt_Open_OFF}
            />
            <mesh
              geometry={nodes.Butt_Open_2.geometry}
              material={materials["doors_lift.011"]}
            />
          </group>
          <group
            position={[-3.66, 0.29, 22]}
            rotation={[0, 0, -Math.PI]}
            scale={[1.53, 0.61, 1.53]}
          >
            <mesh               
              material-color={floor === 1 ? "green" : "white"}
              geometry={nodes.Button_1_1.geometry}
              material={materials.Button_1_OFF}
            />
            <mesh
              geometry={nodes.Button_1_2.geometry}
              material={materials["doors_lift.012"]}
            />
          </group>
          <group
            position={[3.54, 0.29, 22]}
            rotation={[0, 0, -Math.PI]}
            scale={[1.53, 0.61, 1.53]}
          >
            <mesh
              geometry={nodes.Button_2_1.geometry}
              material={materials.Button_2_OFF}
            />
            <mesh
              geometry={nodes.Button_2_2.geometry}
              material={materials["doors_lift.013"]}
            />
          </group>
          <group
            position={[-3.66, 0.29, 17]}
            rotation={[0, 0, -Math.PI]}
            scale={[1.53, 0.61, 1.53]}
          >
            <mesh
              geometry={nodes.Button_3_1.geometry}
              material={materials.Button_3_OFF}
            />
            <mesh
              geometry={nodes.Button_3_2.geometry}
              material={materials["doors_lift.014"]}
            />
          </group>
          <group
            position={[3.54, 0.29, 17]}
            rotation={[0, 0, -Math.PI]}
            scale={[1.53, 0.61, 1.53]}
          >
            <mesh
              geometry={nodes.Button_4_1.geometry}
              material={materials.Button_4_OFF}
            />
            <mesh
              geometry={nodes.Button_4_2.geometry}
              material={materials["doors_lift.015"]}
            />
          </group>
          <group
            position={[-3.66, 0.29, 12]}
            rotation={[0, 0, -Math.PI]}
            scale={[1.53, 0.61, 1.53]}
          >
            <mesh
              geometry={nodes.Button_5_1.geometry}
              material={materials.Button_5_OFF}
            />
            <mesh
              geometry={nodes.Button_5_2.geometry}
              material={materials["doors_lift.016"]}
            />
          </group>
          <group
            position={[3.54, 0.29, 12]}
            rotation={[0, 0, -Math.PI]}
            scale={[1.53, 0.61, 1.53]}
          >
            <mesh
              geometry={nodes.Button_6_1.geometry}
              material={materials.Button_6_OFF}
            />
            <mesh
              geometry={nodes.Button_6_2.geometry}
              material={materials["doors_lift.017"]}
            />
          </group>
          <group
            position={[-3.66, 0.29, 7]}
            rotation={[0, 0, -Math.PI]}
            scale={[1.53, 0.61, 1.53]}
          >
            <mesh
              geometry={nodes.Button_7_1.geometry}
              material={materials.Button_7_OFF}
            />
            <mesh
              geometry={nodes.Button_7_2.geometry}
              material={materials["doors_lift.018"]}
            />
          </group>
          <group
            position={[3.54, 0.29, 7]}
            rotation={[0, 0, -Math.PI]}
            scale={[1.53, 0.61, 1.53]}
          >
            <mesh
              geometry={nodes.Button_8_1.geometry}
              material={materials.Button_8_OFF}
            />
            <mesh
              geometry={nodes.Button_8_2.geometry}
              material={materials["doors_lift.019"]}
            />
          </group>
          <group
            position={[-3.66, 0.29, 2]}
            rotation={[0, 0, -Math.PI]}
            scale={[1.53, 0.61, 1.53]}
          >
            <mesh
              geometry={nodes.Button_9_1.geometry}
              material={materials.Button_9_OFF}
            />
            <mesh
              geometry={nodes.Button_9_2.geometry}
              material={materials["doors_lift.020"]}
            />
          </group>
          <group
            position={[-3.66, 0.29, 32.22]}
            rotation={[0, 0, -Math.PI]}
            scale={[1.53, 0.61, 1.53]}
          >
            <mesh
              geometry={nodes.Button_B1_1.geometry}
              material={materials.Button_B1_OFF}
            />
            <mesh
              geometry={nodes.Button_B1_2.geometry}
              material={materials["doors_lift.021"]}
            />
          </group>
         
          <group
            position={[-3.66, 0.29, 27.16]}
            rotation={[0, 0, Math.PI]}
            scale={[1.53, 0.61, 1.53]}
          >
            <mesh
              geometry={nodes.Button_G_1.geometry}
              material={materials.Button_G_OFF}
            />
            <mesh
              geometry={nodes.Button_G_2.geometry}
              material={materials["doors_lift.023"]}
            />
          </group>
          <group
            position={[3.54, 0.29, 2]}
            rotation={[0, 0, -Math.PI]}
            scale={[1.53, 0.61, 1.53]}
          >
            <mesh
              geometry={nodes.Button_R_1.geometry}
              material={materials.Button_R_OFF}
            />
            <mesh
              geometry={nodes.Button_R_2.geometry}
              material={materials["doors_lift.024"]}
            />
          </group>
          <mesh
            geometry={nodes.Display.geometry}
            material={materials["Disp_B2.001"]}
            position={[0.02, 0.35, -52.08]}
            scale={[7.66, 7.66, 7.66]}
          />
          <mesh
            geometry={nodes.Panel_1.geometry}
            material={materials["Panel with buttons"]}
            position={[0, -0.18, 0]}
            scale={[7.66, 7.66, 7.66]}
          />
        </group>
        <group
          position={[0, 0, 0.02]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.08, 0.08, 0.08]}
        >
          <mesh
            geometry={nodes.Elevator_1.geometry}
            material={materials.wall_new_2}
          />
          <mesh
            geometry={nodes.Elevator_2.geometry}
            material={materials["doors_lift.002"]}
          />
          <mesh
            geometry={nodes.Elevator_3.geometry}
            material={materials.wall_new3}
          />
          <mesh
            geometry={nodes.Elevator_4.geometry}
            material={materials.mirror}
          />
          <mesh
            geometry={nodes.Elevator_5.geometry}
            material={materials.floor_lift}
          />
          <mesh
            geometry={nodes.Elevator_6.geometry}
            material={materials.roof_lift}
          />
          <mesh
            geometry={nodes.Elevator_7.geometry}
            material={materials.chrome_lift}
          />
        </group>
        <mesh
          geometry={nodes.Frame.geometry}
          material={materials["doors_lift.003"]}
          position={[0, -0.03, -0.99]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.08, 0.08, 0.08]}
        >
          <group position={[-2.87, 1.53, 6.26]} scale={[13.06, 13.06, 13.06]}>
            <mesh
              ref={leftDoorB}
              geometry={nodes.Door_Left_out.geometry}
              material={materials["doors_lift.004"]}
              position={[-2, 0, -0.44]}
              scale={[0.08, 0.08, 0.08]}
            />
          </group>
          <group position={[2.96, 1.53, 6.26]} scale={[13.06, 13.06, 13.06]}>
            <mesh
              geometry={nodes.Door_Right_out.geometry}
              material={materials["doors_lift.005"]}
              position={[10, 0, -0.44]}
              scale={[0.08, 0.08, 0.08]}
            />
          </group>
          <group
            position={[-6.78, -1.29, 0.42]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[0.39, 0.2, 0.39]}
          >
            <mesh
              geometry={nodes.Butt_Down_1.geometry}
              material={materials.Button_OFF}
            />
            <mesh
              geometry={nodes.Butt_Down_2.geometry}
              material={materials["doors_lift.006"]}
            />
          </group>
          <group position={[-6.78, -1.29, -0.94]} scale={[0.39, 0.2, 0.39]}>
            <mesh
              geometry={nodes.Butt_Up_1.geometry}
              material={materials["Button_OFF.001"]}
            />
            <mesh
              geometry={nodes.Butt_Up_2.geometry}
              material={materials["doors_lift.007"]}
            />
          </group>
          <group position={[0.02, -1.29, -13.76]} scale={[0.92, 0.16, 0.51]}>
            <mesh
              geometry={nodes.Display_2_1.geometry}
              material={materials.Disp_B2}
            />
            <mesh
              geometry={nodes.Display_2_2.geometry}
              material={materials["doors_lift.008"]}
            />
          </group>
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/elevatornew2.glb");

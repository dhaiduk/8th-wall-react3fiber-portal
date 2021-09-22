import create from "zustand";

const useStore = create(set => ({
  sceneIsReady: false,
  audioMute: false,
  floor: 0,
  forceFloor: 0, //until open close button added
  triggerRaiser: true,
  recenterAwaiting: false,
  levelsDataArray: setupLevelsData(),
  doorOpener: false,
  doorCloser: false,
  sceneIsReadySecondary: false,
  hasFirstPlacement: false,
  modelNum: 0,
  boundsWarning: false,
  DebugWanted: false,
  floorClickedX: 0,
  floorClickedY: 0,
  floorClickedZ: 0,
  cursorToX: 0,
  cursorToY: 0,
  cursorToZ: 0,
  characterWelcomeVideoFinished: false,
  clearRaiser: () => set(state => ({ triggerRaiser: false })),
  clearDoorOpener: () => set(state => ({ doorOpener: false })),
  setfloorClickedX: x => set(state => ({ floorClickedX: x })),
  setfloorClickedY: y => set(state => ({ floorClickedY: y })),
  setfloorClickedZ: z => set(state => ({ floorClickedZ: z })),
  setfcursorToX: x => set(state => ({ cursorToX: x })),
  setfcursorToY: y => set(state => ({ cursorToY: y })),
  setcursorToZ: z => set(state => ({ cursorToZ: z })),
  clearDoorCloser: () => set(state => ({ doorCloser: false })),
  upRaiser: () => set(state => ({ triggerRaiser: true })),
  sceneIsReadyRoutine: () => {
    console.log("set sceneIsReady");
    set(state => ({ sceneIsReadySecondary: true }));
  },
  turnDebugOn: () => {
    console.log("set Debug On");  
    // set((state) => ({ DebugWanted: true }));
  },
  hasPlacedRoutine: () => {
    set(state => ({ hasFirstPlacement: true }));
  },
  setWelcomeVideoFinished: () => {
    set(state => ({ characterWelcomeVideoFinished: true }));
  },
  changeModel: x => {
    console.log("changeModel");
    set(state => ({ modelNum: x }));
  },
  setForScene: x => {
    console.log("setForScen" + x);
    set(state => ({
      floor: state.floor + 1,
      forceFloor: x,
      doorCloser: false,
      doorOpener: true
    }));
  },
  doBoundsWarning: x => {
    set(state => ({ boundsWarning: x }));
  },
  setrecenterAwaiting: x => {
    set(state => ({ recenterAwaiting: x }));
  },
  dodoorOpenr: () => {
    console.log("doorOpen");
    set(state => ({
      floor: state.floor + 1,
      doorCloser: false,
      doorOpener: true
    }));
  },

  doorCloseRoutine: () => {
    set(state => ({ doorCloser: true, doorOpener: false }));
  }
}));

function setupLevelsData() {
  //this could be in a .json file - ho,hum
  //FLOORS DATA
  var data = [];
  var obj = {};

  obj["backg"] = "dawn";
  obj["name"] = "groundlevel";
  data.push(obj);

  obj = {};
  obj["backg"] = "night";
  obj["name"] = "1level";
  data.push(obj);

  obj = {};
  obj["backg"] = "forest";
  obj["name"] = "2level";
  data.push(obj);

  obj = {};
  obj["backg"] = "sunset";
  obj["name"] = "3level";
  data.push(obj);

  obj = {};
  obj["backg"] = "park";
  obj["name"] = "4level";
  data.push(obj);

  obj = {};
  obj["backg"] = "lobby";
  obj["name"] = "5level";
  data.push(obj);

  return data;
}

export default useStore;

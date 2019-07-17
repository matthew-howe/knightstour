const RUN_SCRIPT = "RUN_SCRIPT"
const CHANGE_SPEED = "CHANGE_SPEED"
const MODULATE_SPEED = "MODULATE_SPEED"
const UPDATE_TEMP = "UPDATE_TEMP"

export const runScript = script => ({
  type: RUN_SCRIPT,
  script: script
})

export const changeSpeed = newSpeed => ({
  type: CHANGE_SPEED,
  newSpeed: newSpeed
})

export const modulateSpeed = newSpeed => ({
  type: MODULATE_SPEED,
  newSpeed: newSpeed
})

export const updateTemp = newTemp => ({
  type: UPDATE_TEMP,
  newTemp: newTemp
})

const initialState = {
  script: null,
  speed: 125,
  temp: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case "RUN_SCRIPT":
      return Object.assign({}, state, {script: action.script})
    case "CHANGE_SPEED":
      return Object.assign({}, state, {speed: action.newSpeed})
    case "MODULATE_SPEED":
      return Object.assign({}, state, {speed: action.newSpeed})
    case "UPDATE_TEMP":
      return Object.assign({}, state, {temp: action.newTemp})
    default:
      return initialState
  }
}
  

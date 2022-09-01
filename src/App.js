import './App.css';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { run, playPause,sessionTimeReset, setToTarget, toggleIsSession } from './redux/sessionTimeSlice'
import { sessionIncrement, sessionDecrement, sessionReset } from './redux/sessionLengthSlice'
import { breakIncrement, breakDecrement, breakReset } from './redux/breakLengthSlice'
import beepSrc from './audio/beep.mp3'

// set global interval ID
let intervalId = 0;

function App() {

  const dispatch = useDispatch()

  // Session time
  const sessionTimeLeft = useSelector(state => state.sessionTime.value)
  const tikkingState = useSelector(state => state.sessionTime.isTikking)
  const isReset = useSelector(state => state.sessionTime.isReset)
  const isSession = useSelector(state => state.sessionTime.isSession)
  const min = Math.floor(sessionTimeLeft / 60) 
  const mm = min < 10 ? '0'+min : min
  const sec = sessionTimeLeft % 60
  const ss = sec < 10 ? '0'+sec : sec


  useEffect(() => {   
    if(tikkingState){
      intervalId = setInterval(()=>{
        dispatch(run())
      }, 1000)
    } else {
      clearInterval(intervalId)
    }

  },[tikkingState])

  //Session length
  const sessionLength = useSelector(state => state.sessionLength.value)

  //Break length
  const breakLength = useSelector(state => state.breakLength.value)

  //Reset button
  const reset = () => {
    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;
    dispatch(sessionReset())
    dispatch(breakReset())
    dispatch(sessionTimeReset())
  }

  // Time Setting function
  const handleTimeSetting = (reducerFunc) => {
    dispatch(reducerFunc());    
  }
  useEffect(() => {
    if(isReset){
      dispatch(setToTarget(sessionLength * 60))
    }
  }, [sessionLength])
  
  // when count down to 0, switch between session and break
  useEffect(() => {
    if(sessionTimeLeft < 0) {
      const beep = document.getElementById('beep');
      if(isSession){
        dispatch(setToTarget(breakLength * 60))
        dispatch(toggleIsSession())
        beep.play()
      } else {
        dispatch(setToTarget(sessionLength * 60))
        dispatch(toggleIsSession())
        beep.play()
      }    
    }
  },[sessionTimeLeft])

  return (
    <div className="App">
      <audio src={beepSrc} id="beep"></audio>
      <h1>25 + 5 CLOCK</h1>
      <div className='ctn-set-time'>
        <div id="break-label">
          <h2 className='label-heading'>Break Length</h2>
          <div className='ctn-arrow-buttons'>
            <i className="fa-solid fa-arrow-up" id="break-increment" onClick={ () => {
              if(breakLength < 60) {
                handleTimeSetting(breakIncrement)
              }
            } }></i>
            <span id="break-length">{breakLength}</span>
            <i className="fa-solid fa-arrow-down" id="break-decrement" onClick={ () => {
              if(breakLength > 1) {
                handleTimeSetting(breakDecrement)
              }
               }}></i>
          </div>
        </div>
        <div id="session-label">
          <h2 className='label-heading'>Session Length</h2>
          <div className='ctn-arrow-buttons'>
            <i className="fa-solid fa-arrow-up" id="session-increment" onClick={ () => {
              if(sessionLength < 60) {
                handleTimeSetting(sessionIncrement)
              }
            } }></i>
            <span id="session-length">{sessionLength}</span>
            <i className="fa-solid fa-arrow-down" id="session-decrement" onClick={ () => {
              if(sessionLength > 1) {
                handleTimeSetting(sessionDecrement)
              }
            } }></i>
          </div>
        </div>
        
      </div>
      <section>
        <div id="ctn-session-and-time">
          <h2  id="timer-label">{isSession ? "Session" : "Break"}</h2>
          <div id="time-left">{mm}:{ss}</div> 
        </div>
        <div className="ctn-control">
          <span id="start_stop" onClick={()=>{dispatch(playPause())}} >
            {!tikkingState && <i className="fa-solid fa-play" id='playButton'></i>} 
            {tikkingState && <i className="fa-solid fa-pause" id='pauseButton'></i>}
          </span>
          <span id="reset" onClick={reset}>
            <i className="fa-solid fa-arrows-rotate"></i>
          </span>
        </div>
      </section>
    </div>
  );
}

export default App;

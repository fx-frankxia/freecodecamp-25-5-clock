import './App.css';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { run, flip,sessionTimeReset } from './redux/sessionTimeSlice'
import { sessionIncrement, sessionDecrement, sessionReset } from './redux/sessionLengthSlice'
import { breakIncrement, breakDecrement, breakReset } from './redux/breakLengthSlice'

// set global interval ID
let intervalId = 0;

function App() {

  const dispatch = useDispatch()

  // Session time
  const sessionTimeLeft = useSelector(state => state.sessionTime.value)
  const tikkingState = useSelector(state => state.sessionTime.isTikking)
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
    dispatch(sessionReset())
    dispatch(breakReset())
    dispatch(sessionTimeReset())
    if(tikkingState){
      dispatch(flip())
    } 
  }
  return (
    <div className="App">
      <h1>25 + 5 CLOCK</h1>
      <div className='ctn-set-time'>
        <div id="break-label">
          <h2 className='label-heading'>Break Length</h2>
          <div className='ctn-arrow-buttons'>
            <i className="fa-solid fa-arrow-up" id="break-increment" onClick={ () => {
              if(breakLength < 60) {
                dispatch(breakIncrement())
              }
            } }></i>
            <span id="break-length">{breakLength}</span>
            <i className="fa-solid fa-arrow-down" id="break-decrement" onClick={ () => {
              if(breakLength > 1) {
                dispatch(breakDecrement())
              }
               }}></i>
          </div>
        </div>
        <div id="session-label">
          <h2 className='label-heading'>Session Length</h2>
          <div className='ctn-arrow-buttons'>
            <i className="fa-solid fa-arrow-up" id="session-increment" onClick={ () => {
              if(sessionLength < 60) {
                dispatch(sessionIncrement())
              }
            } }></i>
            <span id="session-length">{sessionLength}</span>
            <i className="fa-solid fa-arrow-down" id="session-decrement" onClick={ () => {
              if(sessionLength > 1) {
                dispatch(sessionDecrement())
              }
            } }></i>
          </div>
        </div>

        
      </div>
      <section id="timer-label">
        <div id="ctn-session-and-time">
          <h2>SESSION</h2>
          <div id="time-left">{mm}:{ss}</div> 
        </div>
        <div className="ctn-control">
          <span id="start_stop" onClick={()=>{dispatch(flip())}} >
            <i className="fa-solid fa-play"></i>
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

import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import { run } from './redux/sessionTimeSlice'
import { useEffect } from 'react'

function App() {
  const sessionTimeLeft = useSelector(state => state.sessionTime.value)
  const dispatch = useDispatch()

  const mm = Math.floor(sessionTimeLeft / 60) 
  const ss = sessionTimeLeft % 60

  useEffect(() => {
    setInterval(()=>{
      dispatch(run())
    }, 1000)
  },[])

  return (
    <div className="App">
      <h1>25 + 5 CLOCK</h1>
      <div className='ctn-set-time'>
        <div id="break-label">
          <h2 className='label-heading'>Break Length</h2>
          <div className='ctn-set-length'>
            <i className="fa-solid fa-arrow-up" id="break-increment"></i>
            <span id="break-length"></span>
            <i className="fa-solid fa-arrow-down" id="break-decrement"></i>
          </div>
        </div>
        <div id="session-label">
          <h2 className='label-heading'>Session Length</h2>
          <div className='ctn-set-length'>
            <i className="fa-solid fa-arrow-up" id="session-increment"></i>
            <span id="session-length"></span>
            <i className="fa-solid fa-arrow-down" id="session-decrement"></i>
          </div>
        </div>

        
      </div>
      <div id="timer-label">
        <h2></h2>
        <div id="time-left">{mm < 10 ? `0${mm}`:mm} : {ss < 10 ? `0${ss}`:ss}</div>  
      </div>
    </div>
  );
}

export default App;

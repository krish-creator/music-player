import './App.scss';
import PlayerComponent from './components/PlayerComponent';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeXmark, faVolumeHigh, faPlay, faPause, faCaretRight, faCaretLeft, faVolumeLow, faRepeat, faShuffle, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

library.add(faVolumeXmark, faVolumeHigh, faPlay, faPause, faCaretRight, faCaretLeft, faVolumeLow, faRepeat, faShuffle, faArrowRightLong)

function App() {
  return (
    <div className="App">
      {/* <LoginComponent /> */}
      <PlayerComponent />
    </div>
  );
}

export default App;

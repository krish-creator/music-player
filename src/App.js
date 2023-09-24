import './App.scss';
import PlayerComponent from './components/PlayerComponent';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeXmark, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

library.add(faVolumeXmark, faVolumeHigh)

function App() {
  return (
    <div className="App">
      {/* <LoginComponent /> */}
      <PlayerComponent />
    </div>
  );
}

export default App;

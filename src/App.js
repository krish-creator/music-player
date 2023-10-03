import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import ListPage from './pages/ListPage';
import LoginPage from './pages/LoginPage';
import PlayerPage from './pages/PlayerPage';

import { faVolumeXmark, faVolumeHigh, faPlay, faPause, faCaretRight, faCaretLeft, faVolumeLow, faRepeat, faShuffle, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
library.add(faVolumeXmark, faVolumeHigh, faPlay, faPause, faCaretRight, faCaretLeft, faVolumeLow, faRepeat, faShuffle, faArrowRightLong)

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<ListPage />} />
        <Route path='/login/' element={<LoginPage />} />
        <Route path='/player/' element={<PlayerPage />} >
          <Route index element={<PlayerPage />} />
          <Route path=':trackId' element={<PlayerPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

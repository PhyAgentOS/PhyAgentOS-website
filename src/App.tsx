import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Hackathon from './pages/Hackathon';

import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/hackathon" element={<Hackathon />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

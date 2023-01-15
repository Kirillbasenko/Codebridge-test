import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from '../../pages/MainPage';
import SinglePage from '../../pages/SinglePage';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/:articleId" element={<SinglePage/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from '../../pages/MainPage';
import SinglePage from '../../pages/SinglePage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/article/:articleId" element={<SinglePage/>}/>
        </Routes>
    </Router>
  );
}

export default App;

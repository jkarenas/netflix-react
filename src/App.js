import {Route,Routes, BrowserRouter} from "react-router-dom"
import React from 'react';
import Home from './components/LandingPage/Home';
import DetailMovie from "./components/Detail/DetailMovie/DetailMovie";
import DetailSerie from "./components/Detail/DetailSerie/DetailSerie";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/movie/:id" element={<DetailMovie/>}/>
          <Route path="/serie/:id" element={<DetailSerie/>}/>
        </Routes>
    </BrowserRouter>

  );
}

export default App;

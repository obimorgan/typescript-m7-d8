import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import TrackDetail from './components/TrackDetail';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trackdetails/:id" element={<TrackDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

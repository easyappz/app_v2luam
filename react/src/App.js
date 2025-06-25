import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Calculator from './components/Calculator';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;

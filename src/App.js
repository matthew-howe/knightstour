import React from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  return (
    <div className='app'>
      <div id="title">
        <h1>Knight's Tour</h1>
        <p>By Matthew Howe</p>
      </div>
      <div>
        <Board />
      </div>
    </div>
  );
}

export default App;

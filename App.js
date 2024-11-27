import React from 'react';
import './App.css'; // если у вас есть стили
import NavScroll from './components/NavScroll.js';
import ChromatinTable from './components/chromatin.js';

function App() {
  return (
    <div className="App">
      <NavScroll />
      <ChromatinTable />
    </div>
  );
}

export default App;

import React from 'react';
import './index.css'
import './App.css';
import Questions from './components/questions/Questions';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Questions />
      <ToastContainer />
    </div>
  );
}

export default App;

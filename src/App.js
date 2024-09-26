import './App.css';

import {Navbar} from "./Navbar.js"
import { CardDefault } from './cards';
import { Page } from './recipe_pg.js';
import { HomePg } from './home.js';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <div className="App">
      <Navbar/>
        <Routes>
          <Route path='/' element={<HomePg/>}/>
          <Route path="/CardDefault" element={<CardDefault />} />
          <Route path="/Page" element={<Page />} />
       </Routes>
    
    </div>
    </Router>
  );
}

export default App;

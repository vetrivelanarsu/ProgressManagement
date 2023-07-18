import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom'

import StudentsPage from './components/StudentsPage';
import IndividualStudent from './components/IndividualStudent';





function App() {
 
  return (
    <div className="App">
            <header className='navbar'>
          <div className='left'>
             Kovela's class
          </div>
          <div className='center'>
            SchoolX
          </div>
          <div className='right'>
             Class's capital: Rs 20000
          </div>

        </header>
    <Routes>
       <Route path='/' element= {<StudentsPage />} />
       <Route path='/:id' element= {<IndividualStudent />} />
    </Routes>
   
    </div>
  );
}

export default App;

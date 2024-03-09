import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WaitingCard from './pages/waiting-card';
import CardPage from './pages/card-page';
import Sidebar from './components/side-bar';
import EmployeesPage from './pages/employees';
import ConfigureCard from './pages/configure-card';
import x from "./classes/employee";
x.getAttendances();
function App() {

  return (
    <div className="App flex" dir='rtl'>
      <BrowserRouter>
        <Sidebar />

        <div className='grow'>
          <Routes>
            <Route path='/' element={<WaitingCard />} />
            <Route path='/:cardId' element={<CardPage />} />
            <Route path='/employees' element={<EmployeesPage />} />
            <Route path="/configure-card/:cardId" element={<ConfigureCard />} />
          </Routes>
        </div>

      </BrowserRouter>

    </div>
  );
}

export default App;

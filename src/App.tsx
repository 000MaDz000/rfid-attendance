import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom';
import WaitingCard from './pages/waiting-card';
import Sidebar from './components/side-bar';
import EmployeesPage from './pages/employees';
import ConfigureCard from './pages/configure-card';
import EmployeePage from './pages/employee-page';
import CardPage from './pages/card-page';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <div className="App flex" dir='rtl'>
      <HashRouter>
        <Sidebar />

        <div className='grow'>
          <Routes>
            <Route path='/' index element={<WaitingCard />} />
            <Route path='/employees' element={<EmployeesPage />} />
            <Route path='/employees/:employeeId' element={<EmployeePage />} />
            <Route path="/configure-card/:cardId" element={<ConfigureCard />} />
            <Route path="/cards" element={<CardPage />} />
          </Routes>
        </div>

      </HashRouter>

    </div>
  );
}

export default App;

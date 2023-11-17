import './App.css';
import { Button } from 'react-bootstrap';
import CustomNavBar from './navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CarDetail from './car-detail';
import Login from './login';
import Signup from './signup';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <CustomNavBar />

        <Routes>
          <Route path="/cars" element={<CarDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { Button } from 'react-bootstrap';
import {CustomNavBar} from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CarDetail from './car-detail';
import Login from './login';
import Signup from './signup';
import HomePage from './homepage';
import { CarDetail, Login, Signup } from './controllers';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <CustomNavBar />

        <Routes>
          <Route path="/cars/:sku" element={<CarDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

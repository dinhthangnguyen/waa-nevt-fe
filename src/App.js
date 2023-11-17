import './App.css';
import { Button } from 'react-bootstrap';
import {CustomNavBar} from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

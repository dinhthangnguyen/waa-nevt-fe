import './App.css';
import { Button } from 'react-bootstrap';
import {CustomFooter, CustomNavBar} from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CarDetail, Login, Signup, HomePage, Cart } from './controllers';

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
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Cart />} />

        </Routes>
        <CustomFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;

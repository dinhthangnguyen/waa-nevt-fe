import './App.css';
import { CustomFooter, CustomNavBar } from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CarDetail, Login, Signup, HomePage, CartPage, OrderPage } from './controllers';

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
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrderPage />} />
        </Routes>
        <CustomFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;

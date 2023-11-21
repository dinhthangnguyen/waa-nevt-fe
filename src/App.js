import './App.css';
import { CustomFooter, CustomNavBar } from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CarDetail, Login, Signup, HomePage, CartPage, OrderPage, AddCarGeneralForm, AddCarAttributeForm, AddCarImageForm, CheckoutPersonalInfo, CheckoutCard, ManageOrderPage, CheckoutConfirmation, CarList, ManageCar } from './controllers';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <CustomNavBar />
        <Routes>
          <Route path="/manage-order" element={<ManageOrderPage />} />
          <Route path="/manage-car" element={<ManageCar />} />
          <Route path="/manage-car/car/:sku" element={<AddCarGeneralForm />} />
          <Route path="/manage-car/car/attribute/:sku" element={<AddCarAttributeForm />} />
          <Route path="/manage-car/car/images/:sku" element={<AddCarImageForm />} />
          <Route path="/manage-car/car" element={<AddCarGeneralForm />} />
          <Route path="/manage-car/car/attribute" element={<AddCarAttributeForm />} />
          <Route path="/manage-car/car/images" element={<AddCarImageForm />} />
          <Route path="/cars/:sku" element={<CarDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/checkout/info" element={<CheckoutPersonalInfo />} />
          <Route exact path="/checkout/card" element={<CheckoutCard />} />
          <Route exact path="/checkout/confirmation" element={<CheckoutConfirmation />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/car-list" element={<CarList />} />
          
        </Routes>
        <CustomFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;

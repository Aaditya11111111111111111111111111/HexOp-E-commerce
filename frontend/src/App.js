import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout'
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kids_banner from './Components/Assets/banner_kids.png';
import AboutUs from './Pages/AboutUs';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="Men" />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="Women" />} />
          <Route path='/kids' element={<ShopCategory banner={kids_banner} category="Kids" />} />
          <Route path="product">
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='AboutUs' Component={AboutUs} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

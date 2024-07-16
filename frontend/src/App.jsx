import './App.css'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Shop from './pages/Shop'
import ShopCategary from './pages/ShopCategary'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LoginSign from './pages/LoginSign'
import Footer from './components/Footer/Footer'
import men_banner from './components/Assets/banner_mens.png'
import women_banner from './components/Assets/banner_women.png'
import kids_banner from './components/Assets/banner_kids.png'
import PlaceOrder from './components/placeorder/PlaceOrder'
import axios from 'axios'

function App() { 

  axios.defaults.baseURL = "http://localhost:4000/";
  axios.defaults.withCredentials = true;

  return (
    <> 
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Shop />} />
      <Route path='/men' element={<ShopCategary category="men" banner={men_banner}/>} />
      <Route path='/Women' element={<ShopCategary category="women" banner={women_banner}/>} />
      <Route path='/kids' element={<ShopCategary category="kid" banner={kids_banner}/>} />
      <Route path='/product' element={<Product />}>
        <Route path=':productId' element={<Product />} />
      </Route>
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<LoginSign />} />
      <Route path='/order' element={<PlaceOrder/>}/>
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
}

export default App

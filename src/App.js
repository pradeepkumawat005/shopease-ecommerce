import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home';
import { SignUpForm } from './components/SignUpForm';
import { LoginForm } from './components/LoginForm';
import { LoginSigupPopup } from './components/LoginSigupPopup';
import { useContext, useState } from 'react';
import {ProductPage} from './Pages/ProductPage'
import { Collections } from './Pages/Collections';
import { CardDrawer } from './components/CardDrawer';
import { AppContext } from './ContextApp/AppContext';
import { useEffect } from 'react';
import Footer from './components/Footer';
import { Search } from './components/Search';
import Checkout from "./components/Checkout";
import PageNotFound from "./components/PageNotFound"
import Account from "./components/Account"
import { AboutUs } from './Pages/AboutUs';
import {ContactUs} from './Pages/ContactUs'

function App() {
  const {drawerOpen , setdrawer} = useContext(AppContext);
  const [isLogedIn , setIsLogedIn] = useState(
  () => !!localStorage.getItem("currentUser")
);

const [showModal , setShowModal] = useState(
  () => !localStorage.getItem("currentUser")
);
  const [cartTotalItem , cartTotalItemSet] = useState(0);
  const [openSearch , setSearchOpen] = useState(false);

useEffect(() => {
  if (drawerOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  

  return () => {
    document.body.style.overflow = "auto";
  };

}, [drawerOpen]);
  
useEffect(() => {
  const user = localStorage.getItem("currentUser");

    if(user){
      setShowModal(false); // popup band
      setIsLogedIn(true);
    }
    else{
      setIsLogedIn(false);
    }
}, []);
  function clickHandler(){
     setShowModal(false);
      setdrawer(false);
      setSearchOpen(false)

  }
  return (
    <div className='App'>
        <Search openSearch={openSearch} setSearchOpen={setSearchOpen} />
        <div className='overly-wrapper' data={showModal || drawerOpen ? 'true' : 'false'} onClick={clickHandler} ></div>
        <CardDrawer cartTotalItemSet={cartTotalItemSet} />
        <Header isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn}  setShowModal={setShowModal} cartTotalItem={cartTotalItem} setSearchOpen={setSearchOpen} />
        <LoginSigupPopup showModal={showModal} setShowModal={setShowModal} isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} />
      <div className='main_content'>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/product/:id' element={<ProductPage/>} />
        <Route path='/products' element={<Collections/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/about-us' element={<AboutUs/>} />
        <Route path='/contact-us' element={<ContactUs/>} />
        <Route path='/account' element={<Account setIsLogedIn={setIsLogedIn}/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
      </div>
       <Footer/>
    </div>
  );
}

export default App;

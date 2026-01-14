import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Properties from './pages/Properties';
import ListProperty from './pages/ListProperty';
import Header from './components/Header'
import Footer from './components/Footer'
import TaC from './pages/TermsAndConditions'

const App = () => {
  return (
    <>
      <Header/>
        <div className='min-h-[45vh]'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/properties' element={<Properties/>}/>
            <Route path='/list_property' element={<ListProperty/>}/>
            <Route path='/Terms_and_conditions' element={<TaC/>}/>
          </Routes>
        </div>
      <Footer/>
    </>
  )
}

export default App
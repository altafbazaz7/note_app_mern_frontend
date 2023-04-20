import React from 'react';
import Navbar from './Components/Header/Navbar';
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import BlogSpot from './Pages/BlogSpot/BlogSpot';
import UniqueBlog from './Pages/UniqueBlog/UniqueBlog';
import EditBlogSpot from './Pages/EditBlog/EditBlog';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<BlogSpot/>}/>
        <Route path='/view/:id' element={<UniqueBlog/>}/>
        <Route path='/update/:id' element={<EditBlogSpot/>}/>

      </Routes>
    </>
  )
}

export default App
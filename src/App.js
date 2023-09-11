import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import{BrowserRouter as Router, Route, Routes as Switch,Link} from 'react-router-dom'
import Home from './Pages/Home'
import AddProduct from './Pages/AddProduct'
import Product from './Pages/Product'
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import PageNotFound from './Pages/PageNotFound';
import Profile from './Pages/Profile'
import ChangePassword from './Pages/ChangePassword';
import { AuthContext } from './helpers/AuthContext';
import { useState,useEffect } from 'react';


function App() {
  
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(()=>{
    axios.get('https://recipe-all.onrender.com/auth/validate',{
      headers:{accessToken:localStorage.getItem('accessToken')}
    }).then((response)=>{
      if(response.data.error){
        setAuthState({ ...authState, status: false })
      } 
      else{
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    })
    
  },[])
  const logout =()=>{
    localStorage.removeItem("accessToken")
    setAuthState({ username: "", id: 0, status: false });
  }
  return (
    <div className="App">
      <AuthContext.Provider value={{authState,setAuthState}}>
      <Router>
        <div className='navbar bg-body-tertiary '>
          <div className='navbar-brand'>
            RecipeAll
            <div>

            </div>
          </div>
          
          <Link className='navbar-item' to='add'>Add Product</Link>
      <Link to=''>Home</Link>
      { !authState.status ? (
        <><Link className='nav-item' to='login'>Login</Link>
      <Link className='nav-item' to='registration'>Registration</Link></>
      ):(<>
      <Link className='nav-item' to='profile'>{authState.username}</Link>
      <button className='navbar-toggler' onClick={logout}>Logout</button>
        </>
        
      )

      }</div>
      
      
      
        <Switch>
          <Route path='/' exact Component={Home}></Route>
          <Route path='/add' exact Component={AddProduct}></Route>
          <Route path='/product/:id' exact Component={Product}></Route>
          <Route path='/login' exact Component={Login}></Route>
          <Route path='/registration' exact Component={Registration}></Route>
          <Route path='/profile/password' exact Component={ChangePassword}></Route>
          <Route path='/profile' exact Component={Profile}></Route>
          <Route path='*' exact Component={PageNotFound}></Route>
        </Switch>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

import React, {useContext, useEffect} from 'react';
import  {checkHandler} from './http/userAPI'
import Header from './components/header/header';
import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes, adminRoutes } from "./routes/routes"
import './style.scss'
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import CartModal from './components/modals/cart-modal';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Footer from './components/footer/footer';
import notFound from './components/404/404';
import ControlledCarousel from './components/carousel/carousel';

const App = observer(() => {
  const {user} = useContext(Context)
  useEffect(() => {
    checkHandler().then(data => {
      if (data !== 401){
        user.setUser(data)
        user.setIsAuth(true)
      }
      try{
        if (localStorage.getItem('cart') === 'null'){
          localStorage.setItem('cart', [])
          user.setCart([])
          return
        }else if (localStorage.getItem('cart').length === 0){
          localStorage.setItem('cart', [])
          user.setCart([])
          return
        }else{
          user.setCart(JSON.parse(localStorage.getItem('cart')))
        }}catch(e){}
    }) 
  }, [user])
  
  return (
    <React.Fragment>
      <Header />
      <ControlledCarousel />
      <CartModal />
      <div className='container'>
        <Routes>
          {!user.isAuth ? authRoutes.map(({path, Component}) => <Route key={path} path={path} element={ <Component />} exact/> ) : null}
          {user.isAdmin ? adminRoutes.map(({path, Component}) => <Route key={path} path={path} element={ <Component />} exact />) : null}
          {publicRoutes.map(({path, Component}) => <Route key={path} path={path} element={ <Component />} exact />)}
       
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
})

export default App;

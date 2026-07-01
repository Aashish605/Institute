import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Components/Nav'
import Footer from './Components/Footer'
import Whatsapp from './Components/Whatsapp'
import ScrollToTop from './Components/ScrollToTop'
import { useDispatch } from 'react-redux'
import { setUser, clearUser, setLoading } from './Redux/Auth/AuthSlice'
import api from './config/api'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    api.get("/auth/user")
      .then(res => {
        if (res.data.user) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(clearUser());
        }
      })
      .catch(() => dispatch(clearUser()));
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Nav />
      <Outlet />
      <Whatsapp />
      <Footer />
    </>
  )
}

export default App
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Components/Nav'
import Footer from './Components/Footer'
import Whatsapp from './Components/Whatsapp'
import ScrollToTop from './Components/ScrollToTop'
import { useDispatch } from 'react-redux'
import { setUser, clearUser, setLoading } from './Redux/Auth/AuthSlice'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    fetch("http://localhost:4000/auth/user", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          dispatch(setUser(data.user));
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
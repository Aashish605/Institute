import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './Redux/Store.js'
import { Provider } from 'react-redux'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import App from './App.jsx'
import Home from "./Home/Home.jsx";
import About from './About/About.jsx'
import Contact from './Contact/Contact.jsx'
import Course from './Course/Course.jsx'
import CourseModel from './Course/CourseModel.jsx'
import Mock from './Mock/Mock.jsx'
import Notice from './Notice/Notice.jsx'
import MockModel from './Mock/MockModel.jsx'
import NoticeModel from './Notice/NoticeModel.jsx'
import Post from './Components/Post.jsx'
import Enroll from './Course/Enroll.jsx'
import Profile from './Profile/Profile.jsx'
import Login from './Profile/Login.jsx'
import { RequireAuth, RequireAdmin } from './Components/ProtectedRoutes';
import Verify from './Components/Verify.jsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route path='' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/course' element={<Course />} />
    <Route path='/course/:model' element={<CourseModel />} />
    <Route path='/mock/:model' element={<MockModel />} />
    <Route path='/notice/:model' element={<NoticeModel />} />
    <Route element={<RequireAuth />}>
    <Route path='/course/:model/enroll' element={<Enroll />} />
      <Route path='/mock' element={<Mock />} />
      <Route path='/profile' element={<Profile />} />
    </Route>
    <Route path='/notice' element={<Notice />} />
    <Route element={<RequireAdmin />}>
      <Route path='/post' element={<Post />} />
      <Route path='/verify' element={<Verify />} />
    </Route>
    <Route path='/login' element={<Login />} />
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer limit={1} />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

import { AuthProvider } from './context/AuthContext'
import App from './App'
import AdminRoute from './components/AdminRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CourseList from './pages/CourseList'
import CourseForm from './pages/CourseForm'
import NoticeList from './pages/NoticeList'
import NoticeForm from './pages/NoticeForm'
import MockList from './pages/MockList'
import MockForm from './pages/MockForm'
import Payments from './pages/Payments'
import Contacts from './pages/Contacts'
import ContentEditor from './pages/ContentEditor'
import TestimonialList from './pages/TestimonialList'
import TestimonialForm from './pages/TestimonialForm'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './pages/NotFound'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/login" element={<Login />} />
    <Route element={<AdminRoute />}>
      <Route path="" element={<Dashboard />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/courses/new" element={<CourseForm />} />
      <Route path="/courses/:id/edit" element={<CourseForm />} />
      <Route path="/notices" element={<NoticeList />} />
      <Route path="/notices/new" element={<NoticeForm />} />
      <Route path="/mocks" element={<MockList />} />
      <Route path="/mocks/new" element={<MockForm />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/content" element={<ContentEditor />} />
      <Route path="/testimonials" element={<TestimonialList />} />
      <Route path="/testimonials/new" element={<TestimonialForm />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer limit={1} />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>,
)

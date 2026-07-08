import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar, closeSidebar } from '../Redux/Sidebar/Sidebarslice'
import { clearUser } from '../Redux/Auth/AuthSlice'
import api from '../config/api'
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import { SITE, NAV_COURSES } from '../config/site'

export default function Nav() {
  const dispatch = useDispatch();
  const select = useSelector((state) => state.Sidebar.isSidebarOpen);
  const logIn = useSelector((state) => state.auth.user)

  const [dropdown, setDropdown] = useState(false)
  const [Courses, setCourses] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileCourses, setMobileCourses] = useState(false)
  const [imgError, setImgError] = useState(false)
  const dropdownRef = useRef(null)
  const mobileCoursesRef = useRef(null)

  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)
  })

  useEffect(() => {
    setImgError(false)
  }, [logIn])

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false)
      }
      if (mobileCoursesRef.current && !mobileCoursesRef.current.contains(e.target)) {
        setMobileCourses(false)
      }
      if (!e.target.closest('.sidebar') && select) {
        dispatch(closeSidebar())
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [dispatch, select])

  return (
    <>
      {/* Mobile Nav */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-[900px]:hidden fixed top-0 left-0 right-0 z-50"
      >
        <div className={`flex items-center justify-between px-4 py-3 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm' : 'bg-white'}`}>
          <NavLink to="" onClick={() => dispatch(closeSidebar())}>
            <img src="/logo.png" alt={SITE.name} className="h-10 w-auto" />
          </NavLink>
          <button
            aria-label={select ? "Close menu" : "Open menu"}
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg hover:bg-surface transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {select ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></>
              )}
            </svg>
          </button>
        </div>
        <AnimatePresence>
          {select && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="sidebar bg-white border-t border-border overflow-hidden shadow-lg"
            >
              <div className="px-4 py-3 space-y-1">
                <NavLink onClick={() => dispatch(toggleSidebar())} to="" className={({ isActive }) => `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface'}`}>
                  Home
                </NavLink>
                <div ref={mobileCoursesRef}>
                  <button
                    onClick={() => setMobileCourses(!mobileCourses)}
                    className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface transition-colors"
                  >
                    Courses
                    <motion.svg animate={{ rotate: mobileCourses ? 180 : 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {mobileCourses && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 py-1 space-y-1">
                          <NavLink onClick={() => dispatch(toggleSidebar())} to="/course" className="block px-4 py-2 rounded-lg text-sm text-secondary font-medium hover:bg-secondary/5 transition-colors">
                            View All Courses
                          </NavLink>
                          {NAV_COURSES.map((c, i) => (
                            <NavLink key={i} onClick={() => dispatch(toggleSidebar())} to={`/course/${c.slug}`} className="block px-4 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface transition-colors">
                              {c.title}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <NavLink onClick={() => dispatch(toggleSidebar())} to="/mock" className={({ isActive }) => `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface'}`}>
                  Mock Test
                </NavLink>
                <NavLink onClick={() => dispatch(toggleSidebar())} to="/notice" className={({ isActive }) => `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface'}`}>
                  Notice
                </NavLink>
                <NavLink onClick={() => dispatch(toggleSidebar())} to="/about" className={({ isActive }) => `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface'}`}>
                  About Us
                </NavLink>
                <hr className="my-2 border-border" />
                {logIn ? (
                  <>
                    <NavLink onClick={() => dispatch(toggleSidebar())} to="/profile" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-surface transition-colors">
                      <img src={imgError ? '/profile.jpg' : logIn.photo} onError={() => setImgError(true)} className="w-7 h-7 rounded-full object-cover" alt="" />
                      <span>{logIn.displayName}</span>
                    </NavLink>
                    <button onClick={() => { api.get('/auth/logout').finally(() => dispatch(clearUser())); dispatch(toggleSidebar()) }} className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-error hover:bg-error/5 transition-colors">
                      Log Out
                    </button>
                  </>
                ) : (
                  <NavLink onClick={() => dispatch(toggleSidebar())} to="/login" className="block px-4 py-2.5 rounded-lg text-sm font-medium text-primary hover:bg-primary/5 transition-colors">
                    Sign In
                  </NavLink>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Desktop Nav */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`hidden min-[900px]:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : 'bg-white/50 backdrop-blur-sm'}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <NavLink to="" className="flex-shrink-0">
              <img src="/logo.png" alt={SITE.name} className="h-10 w-auto" />
            </NavLink>

            <div className="flex items-center gap-1">
              <NavLink to="" end className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-primary bg-primary/5' : 'text-text-secondary hover:text-text hover:bg-surface'}`}>
                Home
              </NavLink>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setCourses(!Courses)}
                  onMouseEnter={() => setCourses(true)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${Courses ? 'text-primary bg-primary/5' : 'text-text-secondary hover:text-text hover:bg-surface'}`}
                >
                  Courses
                  <motion.svg animate={{ rotate: Courses ? 180 : 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {Courses && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      onMouseLeave={() => setCourses(false)}
                      className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-lg border border-border overflow-hidden"
                    >
                      <div className="p-1">
                        <NavLink to="/course" onClick={() => setCourses(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-secondary hover:bg-secondary/5 transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /></svg>
                          View All Courses
                        </NavLink>
                        <hr className="my-1 border-border" />
                        {NAV_COURSES.map((c, i) => (
                          <NavLink key={i} to={`/course/${c.slug}`} onClick={() => setCourses(false)} className="block px-3 py-2.5 rounded-lg text-sm text-text-secondary hover:bg-surface hover:text-text transition-colors">
                            <div className="font-medium line-clamp-1">{c.title}</div>
                            <div className="text-xs text-text-muted mt-0.5">{c.price}</div>
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink to="/mock" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-primary bg-primary/5' : 'text-text-secondary hover:text-text hover:bg-surface'}`}>
                Mock Test
              </NavLink>
              <NavLink to="/notice" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-primary bg-primary/5' : 'text-text-secondary hover:text-text hover:bg-surface'}`}>
                Notice
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-primary bg-primary/5' : 'text-text-secondary hover:text-text hover:bg-surface'}`}>
                About Us
              </NavLink>
            </div>

            <div className="flex items-center gap-3">
              {logIn ? (
                <div className="relative">
                  <button onClick={() => setDropdown(!dropdown)} className="flex items-center gap-2 p-1 rounded-full hover:bg-surface transition-colors">
                    <img src={imgError ? '/profile.jpg' : logIn.photo} onError={() => setImgError(true)} className="w-8 h-8 rounded-full object-cover border-2 border-secondary" alt="" />
                  </button>
                  <AnimatePresence>
                    {dropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-border overflow-hidden"
                      >
                        <div className="p-1">
                          <NavLink to="/profile" onClick={() => setDropdown(false)} className="block px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface transition-colors">Profile</NavLink>
                          <button onClick={() => { api.get('/auth/logout').finally(() => dispatch(clearUser())); setDropdown(false) }} className="w-full text-left px-3 py-2 rounded-lg text-sm text-error hover:bg-error/5 transition-colors">Log Out</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink to="/login" className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-light transition-colors shadow-sm">
                  Sign In
                </NavLink>
              )}
              <NavLink to="/contact" className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-secondary hover:bg-secondary-light transition-colors shadow-sm">
                Contact
              </NavLink>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}

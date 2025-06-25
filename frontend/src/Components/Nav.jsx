import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar, closeSidebar } from '../Redux/Sidebar/Sidebarslice'
import { clearUser } from '../Redux/Auth/AuthSlice'
import { useEffect, useState } from "react";

export default function Nav() {
    const dispatch = useDispatch();
    const select = useSelector((state) => state.Sidebar.isSidebarOpen);
    const logIn = useSelector((state) => state.auth.user)
    const isAdmin = logIn?.isAdmin;
    console.log(logIn);

    const [dropdown, setDropdown] = useState(false)

    const [Courses, setCourses] = useState(false)
    useEffect(() => {
        const handleSidebar = (e) => {
            if (!e.target.closest('.sidebar') && select) {
                dispatch(closeSidebar())
            }
        }

        const handledropdown = (e) => {
            if (!e.target.closest('.dropdown') && Courses) {
                setCourses(false)
            }
        }
        const handleimgdropdown = (e) => {
            if (!e.target.closest('.drop') && dropdown) {
                setDropdown(false)
            }
        }


        document.addEventListener("click", handleSidebar)
        document.addEventListener("click", handledropdown)
        document.addEventListener("click", handleimgdropdown)
        return () => {
            document.removeEventListener("click", handleSidebar)
            document.removeEventListener("click", handledropdown)
            document.removeEventListener("click", handleimgdropdown)
        };
    }, [dispatch, select, Courses, dropdown]);


    return (
        <>
            <nav className={`min-[815px]:hidden sidebar sticky top-0 z-30 shadow-md w-[100vw]  bg-white h-[10vh] `}>
                <div className={` px-3  flex items-center justify-between  `}>
                    <NavLink onClick={() => (dispatch(toggleSidebar()))} to=''>
                        <img src="/logo.png" alt="logo" className=" sm:w-[18vw]  sm:h-[10vh] w-[25vw] h-[10vh] " />
                    </NavLink>
                    <div>
                        <svg className={`ml-2 menu  ${select ? 'hidden' : ''}`} onClick={() => { dispatch(toggleSidebar()) }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0 0 70 40">
                            <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
                        </svg>
                        <svg className={`ml-2 close ${select ? '' : 'hidden'} `} onClick={() => { dispatch(toggleSidebar()) }} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34" height="34" viewBox="0 0 24 24">
                            <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                        </svg>
                    </div>
                    <div className={`absolute flex flex-col shadow-md shadow-gray-200  left-0 top-[100%] text-create  overflow-scroll  w-full max-[425px]:w-full   h-fit  z-10  gap-10 bg-white ${select ? ' ' : ' hidden '}  `} >
                        <div className=" overflow-scroll overflow-x-hidden flex flex-col  flex-grow gap-y-2 ">
                            <NavLink onClick={() => (dispatch(toggleSidebar()))} to="" className={({ isActive }) => `relative hover:opacity-85 mx-4  ${isActive ? `` : " opacity-70"}`}>
                                Home
                            </NavLink>
                            <div onClick={() => { setCourses(!Courses) }} to="" className={`dropdown relative hover:opacity-85 w-full  flex flex-col ${Courses ? 'bg-gray-100 opacity-80 group' : " opacity-70"}`}>
                                <div className=" flex items-center justify-between">
                                    <p className="mx-4 group-even:font-medium ">Courses</p>
                                    <img src="/darrow.png" className={`w-5 h-5 mx-2 ${Courses ? "rotate-180" : ""} duration-500`} alt="" />
                                </div>
                                <div className={`${Courses ? "flex" : "hidden"} flex-col mx-6`}>
                                    <NavLink onClick={() => (dispatch(toggleSidebar()))} className='flex gap-3 my-2 text-secondary' to='/course'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-8" fill="none" viewBox="0 0 24 24" stroke="orange">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                        </svg>
                                        View All courses</NavLink>
                                    <NavLink onClick={() => (dispatch(toggleSidebar()))} className='my-2 flex-col flex  items-start px-8 justify-center '
                                        to='course/BE | BArch | BSc CSIT Entrance Preparation (Online)'>
                                        <span className="line-clamp-1 text-left">BE | BArch | BSc CSIT Entrance Preparation (Online)</span>
                                        <p className="opacity-50 text-sm">NPR.5000</p>
                                    </NavLink>
                                    <NavLink onClick={() => (dispatch(toggleSidebar()))} className='my-2 flex-col flex items-start px-8  justify-center'
                                        to='course/Bridge Course (Science,Management)'>
                                        <span className="line-clamp-1 text-left ">Bridge Course (Science,Management)</span>
                                        <p className="opacity-50 text-sm">NPR.13000</p>
                                    </NavLink>
                                    <NavLink onClick={() => (dispatch(toggleSidebar()))} className='my-2 flex-col flex items-start px-8 justify-center'
                                        to='course/Entrance Preparation (H.A, Staff Nurse, CMLT, Diploma Engg.)'>
                                        <span className="line-clamp-1 text-left">Entrance Preparation (H.A, Staff Nurse, CMLT, Diploma Engg.)</span>
                                        <p className="opacity-50 text-sm">NPR.2000</p>
                                    </NavLink>
                                </div>
                            </div>
                            <NavLink onClick={() => (dispatch(toggleSidebar()))}
                                to="/mock"
                                className={({ isActive }) =>
                                    `relative hover:opacity-85 mx-4 ${isActive ? `` : " opacity-70"}`
                                }
                            >
                                Mock Test
                            </NavLink>
                            <NavLink onClick={() => (dispatch(toggleSidebar()))}
                                to="/notice"
                                className={({ isActive }) =>
                                    `relative hover:opacity-85 mx-4  ${isActive ? `` : " opacity-70"}`
                                }
                            >
                                Notice
                            </NavLink>
                            <NavLink onClick={() => (dispatch(toggleSidebar()))}
                                to="/about"
                                className={({ isActive }) =>
                                    `relative hover:opacity-85  mx-4 ${isActive ? `` : " opacity-70"}`
                                }
                            >
                                About Us
                            </NavLink>
                        </div>
                        <div className="  flex flex-col flex-shrink-0   h-[20vh] ">
                            <h1 className="w-full h-[1.5px] bg-black opacity-10"></h1>
                            <NavLink to={'/login'} onClick={() => (dispatch(toggleSidebar()))} className='my-4 text-create font-medium opacity-50 mx-8' >Sign in</NavLink>
                            <NavLink onClick={() => (dispatch(toggleSidebar()))} to='/contact' className='mx-8 text-create font-medium opacity-50  ' >Contact</NavLink>
                        </div>
                    </div>
                </div>
            </nav >
            <nav className={` hidden top-0 z-30  bg-white shadow-md w-full min-[815px]:sticky min-[815px]:flex justify-around items-center px-10 py-2 gap-20 `}>
                <NavLink to=''>
                    <img src="/logo.png" alt="logo" className=" w-[13vw] h-[12vh]   " />
                </NavLink>
                <div className="flex flex-wrap items-center justify-center text-center gap-10">
                    <NavLink
                        to=""
                        className={({ isActive }) =>
                            `relative hover:opacity-85  ${isActive ? `before:content-[''] hover:opacity-100 before:absolute  before:left-0 before:right-0 before:bottom-[-5px] before:h-[2px] before:bg-secondary before:scale-x-125` : " opacity-70"}`
                        }
                    >
                        Home
                    </NavLink>
                    <div onClick={() => { setCourses(!Courses) }} className={`dropdown relative  cursor-pointer   ${Courses ? '' : `before:content-[''] hover:opacity-100 before:absolute  before:left-0 before:right-0 before:bottom-[-5px] before:h-[2px] before:bg-gray-300  group`}`}>
                        <div className=" flex items-center justify-between">
                            <p className="mx-2 ">Courses</p>
                            <img src="/darrow.png" className={`w-4 h-4 ${Courses ? 'rotate-180 duration-500' : 'rotate-0 duration-500 '} `} alt="" />
                        </div>
                        <div className={`dropdown ${Courses ? ' absolute w-fit px-2 gap-4 z-50  rounded-2xl shadow-2xl  bg-[#f9fafb] top-[100%]' : 'hidden'}`}>
                            <div className=" flex flex-col w-[250px] opacity-100 my-2">
                                <NavLink className='flex gap-3 my-2 text-secondary' to='course'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-8" fill="none" viewBox="0 0 24 24" stroke="orange">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                    </svg>
                                    View All courses</NavLink>
                                <NavLink className='my-2 flex-col flex  items-start px-8 justify-center '
                                    to='course/BE | BArch | BSc CSIT Entrance Preparation (Online)'>
                                    <span className="line-clamp-1 text-left">BE | BArch | BSc CSIT Entrance Preparation (Online)</span>
                                    <p className="opacity-50 text-sm">NPR.5000</p>
                                </NavLink>
                                <NavLink className='my-2 flex-col flex items-start px-8  justify-center'
                                    to='course/Bridge Course (Science,Management)'>
                                    <span className="line-clamp-1 text-left ">Bridge Course (Science,Management)</span>
                                    <p className="opacity-50 text-sm">NPR.13000</p>
                                </NavLink>
                                <NavLink className='my-2 flex-col flex items-start px-8 justify-center'
                                    to='course/Entrance Preparation (H.A, Staff Nurse, CMLT, Diploma Engg.)'>
                                    <span className="line-clamp-1 text-left">Entrance Preparation (H.A, Staff Nurse, CMLT, Diploma Engg.)</span>
                                    <p className="opacity-50 text-sm">NPR.2000</p>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <NavLink
                        to="/mock"
                        className={({ isActive }) =>
                            `relative hover:opacity-85  ${isActive ? `before:content-[''] hover:opacity-100 before:absolute  before:left-0 before:right-0 before:bottom-[-5px] before:h-[2px] before:bg-secondary before:scale-x-125` : " opacity-70"}`
                        }
                    >
                        Mock Test
                    </NavLink>
                    <NavLink
                        to="/notice"
                        className={({ isActive }) =>
                            `relative hover:opacity-85  ${isActive ? `before:content-[''] hover:opacity-100 before:absolute  before:left-0 before:right-0 before:bottom-[-5px] before:h-[2px] before:bg-secondary before:scale-x-125` : " opacity-70"}`
                        }
                    >
                        Notice
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `relative hover:opacity-85  ${isActive ? `before:content-[''] hover:opacity-100 before:absolute  before:left-0 before:right-0 before:bottom-[-5px] before:h-[2px] before:bg-secondary before:scale-x-125` : " opacity-70"}`
                        }
                    >
                        About Us
                    </NavLink>
                    {
                        isAdmin && (<NavLink
                            to="/post"
                            className={({ isActive }) =>
                                `relative hover:opacity-85  ${isActive ? `before:content-[''] hover:opacity-100 before:absolute  before:left-0 before:right-0 before:bottom-[-5px] before:h-[2px] before:bg-secondary before:scale-x-125` : " opacity-70"}`
                            }
                        >
                            post
                        </NavLink>)
                    }
                </div>
                <div className="flex items-center gap-4">
                    {logIn ?
                        <div className="relative drop cursor-pointer" >
                            <div className=" ">
                                <img onClick={() => { setDropdown(!dropdown) }} src={logIn.photo} className="rounded-[50%] border-secondary border object-center object-cover  w-[50px] " alt="" />
                            </div>
                            <div className={`drop ${dropdown ? ' absolute w-fit px-2 left-[-30px] right-0 lg:left-0  gap-y-4 z-50  rounded-2xl shadow-2xl   bg-[#f9fafb] top-[100%]' : 'hidden'}`}>
                                <div className=" flex flex-col w-[150px] opacity-100 my-2">
                                    <NavLink className='my-2 flex-col flex  items-start px-8 justify-center '
                                        to='/profile'>
                                        <span className="line-clamp-1 text-left">Profile</span>
                                    </NavLink>
                                    <NavLink onClick={() => { dispatch(clearUser()) }} className='my-2 flex-col flex items-start px-8  justify-center'>
                                        <span className="line-clamp-1 text-left ">Log Out</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        : < NavLink to={'/login'} className="outline-1 px-4 py-2 rounded-4xl min-w-fit cursor-pointer " > Sign in </NavLink>
                    }
                    {logIn ? <NavLink to='/contact'><img src="/contact.png" className="outline-1  px-2 py-2 rounded-[50%] bject-center object-cover l w-[50px] bg-secondary cursor-pointer text-white " /></NavLink> : <NavLink to='/contact'>
                        <button className="outline-1 px-4 py-2 rounded-4xl bg-secondary cursor-pointer text-white " >Contact</button>
                    </NavLink>}
                </div>
            </nav>
        </>
    );
}

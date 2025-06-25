import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa"; 


const Footer = () => {
    return (
        <>
            <div className="bg-primary mb-[-5vh] text-white">
                <div className="flex flex-wrap justify-between w-full p-10 gap-8">
                    {/* About Us Section */}
                    <div className="w-full  sm:w-[30%]">
                        <p className="text-xl max-[550px]:pt-8">About Us</p>
                        <p className="mt-3 text-wrap  ">
                            Neo Bridge is a dynamic, student-focused educational institute in Nepal, dedicated to empowering learners for success in competitive entrance examinations. We exist to bridge the gap between aspiration and achievement through structured, smart, and supportive learning.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="w-full text-center sm:w-[30%]">
                        <p className="text-xl">Quick Links</p>
                        <div className=" text-[0.9rem]">
                            <li className="hover:text-white hover:underline decoration-0 hover:underline-offset-4 cursor-pointer list-none mt-5">Menu</li>
                            <li className="hover:text-white hover:underline decoration-0 hover:underline-offset-4 cursor-pointer list-none mt-2">About Us</li>
                            <li className="hover:text-white hover:underline decoration-0 hover:underline-offset-4 cursor-pointer list-none mt-2">Log In</li>
                        </div>
                    </div>

                    {/* Connect with Us Section */}
                    <div className="w-full sm:w-[30%] text-center">
                        <p className="text-lg font-semibold">Connect with Us</p>
                        <div className="flex justify-center gap-6 mt-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className=" hover:text-white">
                                <FaFacebook size={20} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className=" hover:text-white">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className=" hover:text-white">
                                <FaTiktok size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="h-[2px] w-[95%] mx-auto mt-4 bg-gray-300 opacity-50"></div>

                <div className="mx-10 py-10 flex flex-wrap items-center justify-center gap-4 text-[0.9rem] ">
                    <li className=" list-none">
                        &copy;2025, <NavLink className="">Neo Bridge</NavLink>
                    </li>
                    <li>
                        <NavLink className="w-fit ">ALl Right Reserved</NavLink>
                    </li>
                    <li>
                        <NavLink to='https://www.facebook.com/aashish.khadka.37625' className="w-fit text-white  hover:underline hover:underline-offset-4">Website Developed By <p  className='inline'>Ashish Khadka</p></NavLink>
                    </li>
                </div>
            </div>
        </>
    );
};

export default Footer;


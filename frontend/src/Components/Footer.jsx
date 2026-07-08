import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { useContent } from '../context/ContentContext'
import { SOCIAL, FOOTER } from '../config/site'


const Footer = () => {
    const content = useContent();
    return (
        <>
            <div className="bg-primary mb-[-5vh] text-white">
                <div className="flex flex-wrap justify-between w-full p-10 gap-8">
                    {/* About Us Section */}
                    <div className="w-full  sm:w-[30%]">
                        <p className="text-xl max-[550px]:pt-8">About Us</p>
                        <p className="mt-3 text-wrap  ">
                            {content.footer_aboutText || FOOTER.aboutText}
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="w-full text-center sm:w-[30%]">
                        <p className="text-xl">Quick Links</p>
                        <div className="text-[0.9rem] flex flex-col items-center">
                            <NavLink to="" className="hover:text-white hover:underline decoration-0 hover:underline-offset-4 mt-5">Menu</NavLink>
                            <NavLink to="/about" className="hover:text-white hover:underline decoration-0 hover:underline-offset-4 mt-2">About Us</NavLink>
                            <NavLink to="/login" className="hover:text-white hover:underline decoration-0 hover:underline-offset-4 mt-2">Log In</NavLink>
                        </div>
                    </div>

                    {/* Connect with Us Section */}
                    <div className="w-full sm:w-[30%] text-center">
                        <p className="text-lg font-semibold">Connect with Us</p>
                        <div className="flex justify-center gap-6 mt-4">
                            <a href={content.social_facebook || SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className=" hover:text-white">
                                <FaFacebook size={20} />
                            </a>
                            <a href={content.social_instagram || SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className=" hover:text-white">
                                <FaInstagram size={20} />
                            </a>
                            <a href={content.social_tiktok || SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" className=" hover:text-white">
                                <FaTiktok size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="h-[2px] w-[95%] mx-auto mt-4 bg-gray-300 opacity-50"></div>

                <div className="mx-10 py-10 flex flex-wrap items-center justify-center gap-4 text-[0.9rem] ">
                    <li className=" list-none">
                        &copy;{new Date().getFullYear()}, <span>{content.site_name || 'Mirror'}</span>
                    </li>
                    <li>
                        <span className="w-fit">{content.footer_rights || 'All Right Reserved'}</span>
                    </li>
                    <li>
                        <NavLink to='https://www.facebook.com/aashish.khadka.37625' className="w-fit text-white  hover:underline hover:underline-offset-4">Website Developed By <p className='inline'>Ashish Khadka</p></NavLink>
                    </li>
                </div>
            </div>
        </>
    );
};

export default Footer;


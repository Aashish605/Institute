import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { NavLink } from 'react-router-dom'
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css'


const Home = () => {

    const [course, setCourse] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/course');
                setCourse(res.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleModal = (e) => {
            if (e.target.closest('.Modal') && isOpen) {
                setIsOpen(false)
            }
        }

        document.addEventListener("click", handleModal)
        return () => {
            document.removeEventListener("click", handleModal)
        };
    }, [isOpen]);


    return (
        <>
            <div>
                {isOpen && (
                    <div className='Modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center '
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", }}
                    >
                        <div className='bg-white rounded-2xl'>
                            <iframe
                                className="rounded-2xl"
                                src="https://www.facebook.com/plugins/video.php?height=500&href=https%3A%2F%2Fwww.facebook.com%2F61555638202803%2Fvideos%2F1042443771036432%2F&show_text=false&width=560&t=0"
                                width="560"
                                height="472"
                                allowfullscreen="true"
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                allowFullScreen="true"
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <section id="home" className="max-w-[85vw] mx-auto">
                    <div className=" mx-auto flex flex-col md:flex-row items-center p-8 gap-10 ">
                        <div className="md:w-1/2 space-y-6 ">
                            <h1 className="text-5xl max-sm:text-4xl font-bold">Empowering Learning for <p className="text-primary inline">Everyone</p></h1>
                            <p className="">Join Neo Bridge where expert-led teaching, data-driven performance analytics, and a mentorship-driven community come together to give you the clarity, confidence, and competence to excel.</p>
                        </div>
                        <div className="md:w-1/2 max-sm:w-[95vw]  flex items-center  justify-center overflow-hidden">
                            <img onClick={() => {
                                setIsOpen(true)
                            }
                            } src="Home/Interview.png" className=" h-[40vh] shadow-xl   rounded-3xl  cursor-pointer  object-cover object-center  " alt="" />
                        </div>
                    </div>
                </section >

                {/* Featured Courses */}
                < div className="bg-[#f9fafb] w-full" >
                    <section id="courses" className="container py-12 max-sm:py-4 max-w-[85vw] mx-auto   ">
                        <h2 className="text-5xl text-secondary font-bold text-center mb-2 ">Our Featured Courses</h2>
                        <p className="text-center font-semibold opacity-50 mb-10">Discover our expert-led courses designed to help you achieve your goals</p>
                        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
                            {course.map((c, i) => (
                                <div key={i} className="shadow-md hover:shadow-xl transition-shadow shadow-gray-300 bg-white rounded-lg  space-y-4">
                                    <img src={c.image} className="rounded-t-2xl " alt="" />
                                    <div className=" flex  flex-col space-y-4 p-6">
                                        <h3 className="text-xl font-semibold overflow-clip">{c.title}</h3>
                                        <p className="line-clamp-3  ">{c.description} </p>
                                        <div className="flex items-center justify-between space-x-2">
                                            <div className="flex flex-col ">
                                                <span className="text-gray-500 text-sm line-through">Rs. {c.oldPrice}</span>
                                                <span className="text-xl text-secondary font-bold">Rs. {c.newPrice}</span>
                                            </div>
                                            <button className="text-sm px-2 py-1 rounded-3xl bg-green-200">{c.discount} off</button>
                                        </div>
                                        <div className="w-full flex  gap-3">
                                            <NavLink to={`/course/${c.title}/enroll`} className=" w-1/2 px-4 py-2 cursor-pointer bg-secondary text-white rounded">Enroll Now</NavLink>
                                            <NavLink to={`/course/${c.title}`} className=" w-1/2 px-4 py-2 cursor-pointer border border-secondary text-secondary rounded">Learn More</NavLink>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div >

                <section className='w-full pb-12 text-white bg-gray-50 '>
                    <div className="flex flex-col p-8 rounded-2xl md:flex-row bg-secondary items-center max-w-[85vw] mx-auto justify-between gap-8">
                        <div className="md:w-2/3">
                            <h2 className="text-3xl font-bold mb-2">Run your Ad's here!</h2>
                            <p className="mb-4">
                                Promote your educational services, products, or events to a highly engaged audience of learners and educators. Contact us to feature your advertisement on Neo Bridge.
                            </p>
                            <NavLink to={'/contact'} className="inline-block px-6 py-2 bg-white text-secondary font-semibold rounded-md shadow hover:bg-gray-100 transition">
                                Contact Us
                            </NavLink>
                        </div>
                        <div className="md:w-1/3 flex justify-center">
                            <img
                                src="/ad.png"
                                alt=""
                                className="rounded-xl shadow-lg w-64 h-40 object-cover object-center bg-gray-200"
                            />
                        </div>
                    </div>
                </section>

                {/* Features */}
                < section className="bg-white  max-w-[85vw] mx-auto my-[10vh] " >
                    <h1 className="text-5xl text-center font-semibold ">Unlock Your Potential with</h1>
                    <h1 className="text-5xl text-center font-semibold text-secondary ">Neo Bridge</h1>
                    <div className="container mx-auto grid  gap-8 my-16  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 jus ">
                        {[
                            { title: "Engaging Hybrid Learning Experiences", icon: "Home/Learning.png", feature: "Experience a perfect blend of live sessions and recorded classes delivered by top professionals tailored to meet your needs." },
                            { title: "Personalized Mentorship", icon: "/Home/Mentor.png", feature: "Enjoy tailored guidance from experienced mentors who assist you in navigating your academic journey effectively." },
                            { title: "Comprehensive Course Library", icon: "Home/Libray.png", feature: "Access a structured content library that simplifies your study process and enriches your learning experience across various subjects." },
                        ].map((f, i) => (
                            <div key={i} className="text-center flex flex-col items-center space-y-4 ">
                                <img src={`${f.icon}`} alt="" className=" w-[5vw]  rounded-[50%] border-secondary max-sm:w-[10vw] " />
                                <h4 className=" font-semibold">{f.title}</h4>
                                <p className="opacity-70">{f.feature} </p>
                            </div>
                        ))}
                    </div>
                </section >

                {/* Testimonials */}
                < div className="bg-gray-50 w-full" >
                    <section className=" py-12 max-w-[85vw] mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-2 ">What People <p className="text-secondary inline">Say</p> About Us</h2>
                        <p className="mb-8 text-center opacity-70">See what people are saying about us</p>
                        <Swiper className="mySwiper my-6 "
                            loop={'true'}
                            pagination={{
                                dynamicBullets: true,
                            }}
                            // navigation={true}
                            modules={[Pagination, Navigation]}

                        >
                            <SwiperSlide className="">
                                <div className="flex justify-center items-center mx-auto   w-[60vw]  h-fit py-10 px-2 gap-10 max-[960px]:flex-col max-[960px]:w-[95vw] ">
                                    <img src="Home/person.png" className="w-[30vh] max-[960px]:w-[20vh] object-center object-cover " alt="" />
                                    <div className=" ">
                                        <p className="text-[1.01rem] text-wrap mb-6 ">
                                            I've been a part of Pi Academy for the part three years, and it's been a rewarding journey. Our bridge course equips SEE-appeared students with a strong academic base for +2, while the IOE Entrance preparation is result-driven and highly focused. With expert faculty, regular mock tests, and a disciplined learning environment, PI Academy ensures every student gets the support they need to succeed. If you're serious about your future, this is the place to be!
                                        </p>
                                        <p className="font-semibold">Ram Shahi</p>
                                        <p className="opacity-60 text-sm">St.Xavier College ,Scholarship</p>
                                        <p className="opacity-60 text-sm">Rank : 1 Entrance 2081</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="">
                                <div className="flex justify-center items-center mx-auto   w-[60vw]  h-fit py-10 px-2 gap-10 max-[960px]:flex-col max-[960px]:w-[95vw] ">
                                    <img src="Home/person.png" className="w-[30vh] max-[960px]:w-[20vh] object-center object-cover " alt="" />
                                    <div className=" ">
                                        <p className="text-[1.01rem] text-wrap mb-6 ">
                                            I've been a part of Pi Academy for the part three years, and it's been a rewarding journey. Our bridge course equips SEE-appeared students with a strong academic base for +2, while the IOE Entrance preparation is result-driven and highly focused. With expert faculty, regular mock tests, and a disciplined learning environment, PI Academy ensures every student gets the support they need to succeed. If you're serious about your future, this is the place to be!
                                        </p>
                                        <p className="font-semibold">Ram Shahi</p>
                                        <p className="opacity-60 text-sm">St.Xavier College ,Scholarship</p>
                                        <p className="opacity-60 text-sm">Rank : 1 Entrance 2081</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="">
                                <div className="flex justify-center items-center mx-auto   w-[60vw]  h-fit py-10 px-2 gap-10 max-[960px]:flex-col max-[960px]:w-[95vw] ">
                                    <img src="Home/person.png" className="w-[30vh] max-[960px]:w-[20vh] object-center object-cover " alt="" />
                                    <div className=" ">
                                        <p className="text-[1.01rem] text-wrap mb-6 ">
                                            I've been a part of Pi Academy for the part three years, and it's been a rewarding journey. Our bridge course equips SEE-appeared students with a strong academic base for +2, while the IOE Entrance preparation is result-driven and highly focused. With expert faculty, regular mock tests, and a disciplined learning environment, PI Academy ensures every student gets the support they need to succeed. If you're serious about your future, this is the place to be!
                                        </p>
                                        <p className="font-semibold">Ram Shahi</p>
                                        <p className="opacity-60 text-sm">St.Xavier College ,Scholarship</p>
                                        <p className="opacity-60 text-sm">Rank : 1 Entrance 2081</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </section>
                </div >
            </div >
        </>
    )
}

export default Home



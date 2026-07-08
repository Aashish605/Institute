import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import api from "../config/api";
import { NavLink } from 'react-router-dom'
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css'
import { useContent } from '../context/ContentContext'
import { HERO, COURSES, ADS, TESTIMONIALS } from '../config/site'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { motion, AnimatePresence } from "motion/react"
import { HeroHighlight, Highlight } from '../components/ui/hero-highlight'
import { BackgroundBeams } from '../components/ui/background-beams'
import { TypewriterEffect } from '../components/ui/typewriter-effect'
import { BentoGrid, BentoGridItem } from '../components/ui/bento-grid'

const Home = () => {
    useDocumentTitle('Home')
    const content = useContent();

    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await api.get('/api/course');
                setCourse(res.data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
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

        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false)
            }
        }

        document.addEventListener("click", handleModal)
        document.addEventListener("keydown", handleEsc)
        return () => {
            document.removeEventListener("click", handleModal)
            document.removeEventListener("keydown", handleEsc)
        };
    }, [isOpen]);

    const features = [
        {
            icon: "Home/Learning.png",
            title: "Engaging Hybrid Learning Experiences",
            description: "Experience a perfect blend of live sessions and recorded classes delivered by top professionals tailored to meet your needs.",
        },
        {
            icon: "/Home/Mentor.png",
            title: "Personalized Mentorship",
            description: "Enjoy tailored guidance from experienced mentors who assist you in navigating your academic journey effectively.",
        },
        {
            icon: "Home/Libray.png",
            title: "Comprehensive Course Library",
            description: "Access a structured content library that simplifies your study process and enriches your learning experience across various subjects.",
        },
    ]

    const heroWords = (content.hero_subtitle || HERO.subtitle).split(" ").map((word) => ({
        text: word,
        className: "text-primary",
    }))

    const [activeTestimonial, setActiveTestimonial] = useState(0)

    return (
        <>
            <div aria-hidden={!isOpen}>
                {isOpen && (
                    <div className='Modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center '
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", }}
                        onKeyDown={(e) => { if (e.key === 'Escape') setIsOpen(false) }}
                    >
                        <div className='bg-white rounded-2xl'>
                            <iframe
                                className="rounded-2xl"
                                src={HERO.video.url}
                                width={HERO.video.width}
                                height={HERO.video.height}
                                allowfullscreen="true"
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                allowFullScreen="true"
                                title="Mirror Academy introduction video"
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {/* Hero Section */}
                <section id="home" className="relative overflow-hidden">
                    <BackgroundBeams />
                    <div className="relative z-10 max-w-[85vw] mx-auto">
                        <div className="flex flex-col md:flex-row items-center min-h-[80vh] p-8 gap-10">
                            <div className="md:w-1/2 space-y-6">
                                <HeroHighlight containerClassName="!h-auto !bg-transparent !p-0 !block">
                                    <h1 className="text-5xl max-sm:text-4xl font-bold">
                                        {content.hero_heading || HERO.heading}{" "}
                                        <Highlight className="from-primary/30 to-secondary/30 dark:from-primary dark:to-secondary">
                                            {content.hero_headingHighlight || HERO.headingHighlight}
                                        </Highlight>
                                    </h1>
                                </HeroHighlight>
                                <TypewriterEffect
                                    words={heroWords}
                                    className="text-left !text-base sm:!text-lg md:!text-xl"
                                    cursorClassName="bg-secondary"
                                />
                            </div>
                            <div className="md:w-1/2 max-sm:w-[95vw] flex items-center justify-center overflow-hidden">
                                <motion.img
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    onClick={() => setIsOpen(true)}
                                    src={content.hero_image || HERO.image}
                                    className="h-[40vh] shadow-xl rounded-3xl cursor-pointer object-cover object-center"
                                    alt="Hero banner"
                                    loading="lazy"
                                    whileHover={{ scale: 1.03 }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Courses */}
                <div className="bg-[#f9fafb] w-full">
                    <section id="courses" className="container py-12 max-sm:py-4 max-w-[85vw] mx-auto">
                        <h2 className="text-5xl text-secondary font-bold text-center mb-2">{content.course_heading || COURSES.heading}</h2>
                        <p className="text-center font-semibold opacity-50 mb-10">{content.course_subtitle || COURSES.subtitle}</p>
                        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                            {loading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="shadow-md animate-pulse shadow-gray-300 bg-white rounded-lg space-y-4">
                                        <div className="rounded-t-2xl h-48 bg-gray-200" />
                                        <div className="p-6 space-y-3">
                                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                                            <div className="h-3 bg-gray-200 rounded w-1/2" />
                                            <div className="h-3 bg-gray-200 rounded w-full" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                course.map((c, index) => (
                                    <motion.div
                                        key={c.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -8 }}
                                        className="shadow-md hover:shadow-xl transition-shadow shadow-gray-300 bg-white rounded-lg space-y-4"
                                    >
                                        <img src={c.image} className="rounded-t-2xl" alt={c.title} loading="lazy" />
                                        <div className="flex flex-col space-y-4 p-6">
                                            <h3 className="text-xl font-semibold overflow-clip">{c.title}</h3>
                                            <p className="line-clamp-3">{c.description}</p>
                                            <div className="flex items-center justify-between space-x-2">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-500 text-sm line-through">Rs. {c.oldPrice}</span>
                                                    <span className="text-xl text-secondary font-bold">Rs. {c.newPrice}</span>
                                                </div>
                                                <button className="text-sm px-2 py-1 rounded-3xl bg-green-200">{c.discount} off</button>
                                            </div>
                                            <div className="w-full flex gap-3">
                                                <NavLink to={`/course/${c.title}/enroll`} className="w-1/2 px-4 py-2 cursor-pointer bg-secondary text-white rounded text-center">Enroll Now</NavLink>
                                                <NavLink to={`/course/${c.title}`} className="w-1/2 px-4 py-2 cursor-pointer border border-secondary text-secondary rounded text-center">Learn More</NavLink>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </section>
                </div>

                {/* Ads Section */}
                <section className='w-full pb-12 text-white bg-gray-50'>
                    <div className="flex flex-col p-8 rounded-2xl md:flex-row bg-secondary items-center max-w-[85vw] mx-auto justify-between gap-8">
                        <div className="md:w-2/3">
                            <h2 className="text-3xl font-bold mb-2">{ADS.title}</h2>
                            <p className="mb-4">{ADS.description}</p>
                            <NavLink to={'/contact'} className="inline-block px-6 py-2 bg-white text-secondary font-semibold rounded-md shadow hover:bg-gray-100 transition">
                                Contact Us
                            </NavLink>
                        </div>
                        <div className="md:w-1/3 flex justify-center">
                            <img
                                src={ADS.image}
                                alt="Advertisement"
                                className="rounded-xl shadow-lg w-64 h-40 object-cover object-center bg-gray-200"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="bg-white max-w-[85vw] mx-auto my-[10vh]">
                    <h1 className="text-5xl text-center font-semibold">Unlock Your Potential with</h1>
                    <h1 className="text-5xl text-center font-semibold text-secondary">Mirror</h1>
                    <BentoGrid className="my-16">
                        {features.map((f, i) => (
                            <BentoGridItem
                                key={i}
                                className={i === 0 ? "md:row-span-2" : ""}
                                title={f.title}
                                description={f.description}
                                header={
                                    <div className="flex justify-center py-4">
                                        <img
                                            src={f.icon}
                                            alt={f.title}
                                            className="w-16 h-16 rounded-full border-2 border-secondary object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                }
                            />
                        ))}
                    </BentoGrid>
                </section>

                {/* Testimonials */}
                <div className="bg-gray-50 w-full">
                    <section className="py-12 max-w-[85vw] mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-2">
                            What People <span className="text-secondary">Say</span> About Us
                        </h2>
                        <p className="mb-8 text-center opacity-70">See what people are saying about us</p>
                        <Swiper
                            className="mySwiper my-6"
                            loop={true}
                            pagination={{ dynamicBullets: true }}
                            modules={[Pagination, Navigation]}
                            onSlideChange={(swiper) => setActiveTestimonial(swiper.realIndex)}
                        >
                            {TESTIMONIALS.map((t, i) => (
                                <SwiperSlide key={i}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTestimonial}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.4 }}
                                            className="flex justify-center items-center mx-auto w-[60vw] h-fit py-10 px-2 gap-10 max-[960px]:flex-col max-[960px]:w-[95vw]"
                                        >
                                            <img
                                                src={t.avatar}
                                                className="w-[30vh] max-[960px]:w-[20vh] object-center object-cover rounded-full"
                                                alt={t.name}
                                                loading="lazy"
                                            />
                                            <div>
                                                <p className="text-[1.01rem] text-wrap mb-6">{t.quote}</p>
                                                <p className="font-semibold">{t.name}</p>
                                                <p className="opacity-60 text-sm">{t.description}</p>
                                                <p className="opacity-60 text-sm">{t.subtext}</p>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Home

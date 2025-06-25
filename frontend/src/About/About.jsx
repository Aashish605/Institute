import React from 'react'
import { NavLink } from 'react-router-dom'

const About = () => {
    return (
        <div className="max-w-[85vw] mx-auto">

            <div className='  bg-[url(/About/image.png)] overflow-hidden my-12 w-full h-[35vh] max-sm:h-[35vh] bg-center bg-cover   rounded-2xl text-white '>
                <div className='relative w-full h-full inset-0 '
                    style={{
                        background: 'rgba(0,0,0,0.3)',
                    }}
                ></div>
                <div className='text-white relative top-[-80%] max-sm:top-[-95%] px-16 max-sm:px-3 '>
                    <span className='my-4 font-bold text-4xl max-sm:text-3xl '>About Neo Bridge</span>
                    <p className='text-xl'>Building a strong foundation for  your future</p>
                </div>
            </div>

            <section className="mb-12 ">
                <span className="text-3xl font-bold mb-12 underline underline-offset-[10px] decoration-secondary ">About Us</span>
                <p className="my-6">
                    <span className='font-semibold inline'>Neo Bridge</span> Academy is a dynamic, student-focused educational institute in Nepal, dedicated to empowering learners for success in competitive entrance examinations. Founded by passionate educators and exam specialists, we exist to bridge the gap between aspiration and achievement through structured, smart, and supportive learning.
                </p>
                <p>
                    Our approach combines <span className='font-semibold inline'> expert-led teaching, data-driven performance analytics,</span>  and a strong mentorship-driven community to give students the clarity, confidence, and competence they need to excel.
                </p>
            </section>

            {/* Introduction */}
            <section className="mb-12  ">
                <h2 className="text-3xl font-bold mb-4 underline underline-offset-[10px] decoration-secondary ">Introduction</h2>
                <p className="mb-4">
                    At <span className='font-semibold inline'>Neo Bridge Academy</span>, we believe that every student has the potential to excel — with the right guidance, strategy, and environment. That's why we offer a comprehensive, student-focused approach to entrance exam preparation, available both online and offline. Here's what sets us apart:
                </p>
                <ul className="list-disc pl-10 mb-4 space-y-2">
                    <li><span className='font-semibold inline'>Focused Entrance Preparation</span> with a strong emphasis on conceptual clarity and foundational understanding</li>
                    <li><span className='font-semibold inline'>Chapter-wise tests, full-length exams, and smart analytics</span> to track performance and guide improvement</li>
                    <li><span className='font-semibold inline'>High-quality recorded video lectures, extensive practice sets,</span> and interactive doubt-solving communities</li>
                    <li><span className='font-semibold inline'>Mentorship from toppers and expert faculty</span> who know what it takes to succeed</li>
                    <li><span className='font-semibold inline'>Personalized support, flexible learning modes,</span> and a vibrant, motivating student community</li>
                </ul>
                <p>
                    At  <span className='font-semibold inline'>Neo Bridge Academy</span>, we don't just prepare you for exams — we help you unlock your full academic potential.
                </p>
            </section>

            {/* Why Students Choose Us */}
            < div className="bg-gray-50 w-full" >
                <section className="mb-12 ">
                    <h2 className="text-3xl font-bold py-12 text-center underline underline-offset-[10px] mx-2 decoration-secondary">Why Students Choose Us</h2>
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 mx-6 pb-12">
                        <div className='bg-white shadow-md rounded-xl px-2 py-6 '>
                            <div className="w-16 h-16 rounded-full mb-2 mx-auto flex items-center justify-center">
                                <img src="About/expert.png" alt="" className='w-[7vh] object-center object-cover ' />
                            </div>
                            <h3 className="font-bold mb-2 text-center text-xl">Expert Instructors</h3>
                            <p className="text-left opacity-70">
                                Our team consists of efficient and knowledgeable instructors with extensive experience in competitive exam preparation.
                            </p>
                        </div>
                        <div className='bg-white shadow-md rounded-xl px-2 py-6 '>
                            <div className="w-16 h-16 rounded-full mb-2 mx-auto flex items-center justify-center">
                                <img src="About/learning.png" alt="" className='w-[7vh] object-center object-cover ' />

                            </div>
                            <h3 className="font-bold mb-2 text-center text-xl">Flexible Learning</h3>
                            <p className="text-left opacity-70">
                                Students can practice anytime and anywhere through online exams and get results that enhance their abilities.
                            </p>
                        </div>
                        <div className='bg-white shadow-md rounded-xl px-2 py-6 '>
                            <div className="w-16 h-16 rounded-full mb-2 mx-auto flex items-center justify-center">
                                <img src="About/support.png" alt="" className='w-[7vh] object-center object-cover ' />
                            </div>
                            <h3 className="font-bold mb-2 text-center text-xl">Dedicated Support</h3>
                            <p className="text-left opacity-70">
                                Regular QAD, doubt clearing sessions, and special guidance by IOE Ambassadors every week.
                            </p>
                        </div>
                    </div>
                    <p className='max-w-[65vw] mx-auto text-center text-xl opacity-70 py-7 '>Founded by Pulchowk Campus graduates and front-line faculty members, PI contributes towards the development of qualitative future engineers who tend to establish a well-settled destiny in the field of engineering.</p>
                </section>
            </div >

            {/* Neo BridgeFamily Message */}
            <section className="mb-12 h-fit rounded-2xl shadow-md overflow-hidden  flex items-center bg-secondary max-[1130px]:bg-white justify-center gap-7 max-[1130px]:flex-col ">
                <div className=' flex flex-col items-center justify-center py-6 bg-secondary max-[1130px]:w-full w-1/3 h-full   '>
                    <img src="About/person.png" alt="" className='' />
                    <span className='text-2xl text-white font-bold text-center'>Message From <br /> Neo Bridge Family </span>
                </div>
                <div className=' w-2/3 max-[1130px]:w-full max-[1130px]:px-4 max-[1130px]:py-6 py-12 px-6 bg-white'>
                    <p className="mb-4">
                        Dear prospective students/Guardians, we take great delight in extending a warm welcome to you all at Neo BridgeAcademy—founded by the front-liner faculties of engineering entrance and graduates of Pulchowk Campus. Choosing Neo Bridgeguarantees you for making your future bright ahead.
                    </p>
                    <p className="mb-4">
                        Our only goal is to support our students academically and maximise their outputs in the competitive examination. We will make our every effort count in paving the excellent way for engineering aspirants towards their dream.
                    </p>
                    <p className="mb-4">
                        Our prime location Kathmandu Valley, Maitighar, is easily accessible from different corners of the valley. We are equipped with adequate infrastructure, quality books and qualified instructors to enforce excellent accomplishments. Together we can grow and create an impact in the field of engineering.
                    </p>
                    <p className="mb-4">
                        Finally, we assume Neo Bridgeshall be considered as a place where your talent is furnished and you shall prepare yourself for a rewarding career in your interested field of engineering/IT and eventually to be a morally honoured and cultured citizen.
                    </p>
                    <p>
                        Wishing you all the best and hoping for your gracious visit.<br />
                        Thank you all.<br />
                        - Neo Bridge Family
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="mb-[10vh] flex items-center flex-col">
                <h2 className="text-3xl font-bold text-center mb-6">Ready to start your journey with Neo Bridge Academy?</h2>
                <NavLink to={'/contact'} className='mx-auto border-2 cursor-pointer border-secondary text-secondary px-6  py-3 rounded-md'>Contact Us</NavLink>
            </section>
        </div>
    )
}


export default About
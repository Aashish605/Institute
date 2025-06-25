import { NavLink } from 'react-router-dom'
import axios from "axios";
import React, { useEffect, useState } from 'react';

const Course = () => {
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://institute-xi.vercel.app/api/course');
                console.log(res.data);

                setCourse(res.data)
            } catch (error) {
                setCourse(null);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;
    if (!course) return <div className="text-center py-20 text-xl text-red-500">Course not found.</div>;
    return (
        <>
            <h1 className='text-5xl text-center font-bold text-secondary mt-16'>
                Explore Our Courses
            </h1>
            <p className='text-xl opacity-70 text-center mt-4'>Transform your future with our expert-led, comprehensive courses</p>
            <div className="grid gap-[10vh] grid-cols-1 py-[10vh] ">
                {course.map((c, i) => (
                    <div key={i} className="shadow-md overflow-hidden flex max-[975px]:flex-col max-w-[85vw] mx-auto transition-shadow hover:shadow-xl shadow-gray-300 bg-white rounded-lg  space-y-4">
                        <img src={c.image} className=" w-[40%] max-[975px]:w-full h-full " alt="" />
                        <div className=" flex  flex-col space-y-4 py-6 px-10">
                            <h3 className="text-xl font-semibold overflow-clip">{c.title}</h3>
                            <p className=" line-clamp-3 ">{c.description} </p>
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
        </>
    )
}

export default Course
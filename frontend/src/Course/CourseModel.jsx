import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams,NavLink } from 'react-router-dom';



const CourseModel = () => {
    const { model } = useParams();
    const [course, setCourse] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/course');
                const found = res.data.find(item => item.title === model);
                setCourse(found)

            } catch (error) {
                setCourse(null);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [model]);

    if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;
    if (!course) return <div className="text-center py-20 text-xl text-red-500">Course not found.</div>;

    return (
        <div className="max-w-[85vw] mx-auto py-12 px-4">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                <img src={course.image} alt={course.title} className="w-full h-full md:w-1/2 rounded-xl shadow-lg object-fill  bg-gray-50" />
                <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{course.title}</h1>
                    <p className="text-lg text-gray-700 mb-4">{course.description}</p>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-gray-500 text-lg line-through">NPR {course.oldPrice}</span>
                        <span className="text-2xl text-secondary font-bold">NPR {course.newPrice}</span>
                        <span className="bg-green-200 text-green-800 px-3 py-1 rounded-2xl font-semibold text-sm">{course.discount} OFF</span>
                    </div>
                    <NavLink to={`/course/${course.title}/enroll`} className="bg-secondary text-white px-6 py-2 rounded-lg font-semibold cursor-pointer hover:bg-secondary/90 transition">Enroll Now</NavLink>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-xl shadow p-6 mb-10">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Why Choose This Course?</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.features && course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center mx-10 gap-3">
                            <img src={feature.icon} alt="" className="w-8 h-8" />
                            <span className="text-lg text-gray-700">{feature.text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Subjects Covered */}
            <div className="bg-white rounded-xl shadow p-6 mb-10">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Subjects Covered</h2>
                <div className="flex flex-wrap gap-3">
                    {course.subjects && course.subjects.map((subject, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-sm">{subject}</span>
                    ))}
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
                <NavLink to={course.materialsLink} className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 hover:text-blue-900 transition-colors mr-4">Access Course Materials →</NavLink>
                <NavLink to='/mock' className="inline-block bg-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 hover:text-blue-900 transition-colors">Access Mock Tests →</NavLink>
            </div>
        </div>
    );
};

export default CourseModel;
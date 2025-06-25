import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MockModel = () => {
    const { model } = useParams();
    const [mock, setMock] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/mock/get');
                const found = res.data.find(item => item._id === model);
                setMock(found);
            } catch (error) {
                setMock(null);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [model]);

    if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;
    if (!mock) return <div className="text-center py-20 text-xl text-red-500">Result not found.</div>;

    return (
        <div className="max-w-[85vw] mx-auto max-sm:px-0 px-6">
            <div className="bg-white rounded-2xl   flex flex-col items-center max-sm:p-0 p-8">
                <div className="text-4xl font-bold pt-6 text-secondary mb-2 text-center"> Result of {mock.Title}</div>
                <div className="text-base font-semibold  mb-2">Conducted on Week: <span className="font-normal">{mock.Week}</span></div>
                <div className="text-gray-700 text-lg mb-6 text-center">{mock.Description}</div>
                <img src={mock.Img} alt={mock.Title} className="w-full h-full  rounded-xl mb-6  " />
                <div className="text-xs text-gray-400 mt-4">Published: {new Date(mock.createdAt).toLocaleDateString()}</div>
            </div>
        </div>
    );
};

export default MockModel;

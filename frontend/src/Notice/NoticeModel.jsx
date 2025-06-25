import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NoticeModel = () => {
    const { model } = useParams();
    const [notice, setnotice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/notice/get');
                const found = res.data.find(item => item._id === model);
                setnotice(found);
            } catch (error) {
                setnotice(null);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [model]);

    if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;
    if (!notice) return <div className="text-center py-20 text-xl text-red-500">Result not found.</div>;


    return (
        <div className="max-w-[85vw] mx-auto max-sm:px-0 px-6">
            <div className="bg-white rounded-2xl   flex flex-col items-center max-sm:p-0 p-8">
                <div className="text-4xl font-bold pt-6 text-secondary mb-2 text-center"> Result of {notice.Title}</div>
                <div className="text-gray-700 text-lg mb-6 text-center">{notice.Description}</div>
                <img src={notice.Img} alt={notice.Title} className="w-full h-full  rounded-xl mb-6  " />
                <div className="text-xs text-gray-400 mt-4">Published: {new Date(notice.createdAt).toLocaleDateString()}</div>
            </div>
        </div>
    )
}

export default NoticeModel

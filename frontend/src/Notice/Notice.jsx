import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'



const Notice = () => {

    const logIn = useSelector((state) => state.auth.user)
    const isAdmin = logIn?.isAdmin;
    const [notices, setnotices] = useState([])


    const getdata = async () => {
        const data = await axios.get('https://institute-xi.vercel.app/api/notice/get')
        setnotices(data.data)
    }

    useEffect(() => {
        getdata()
    }, []);


    const deleteData = async (i) => {
        await axios.post('https://institute-xi.vercel.app/api/notice/delete', { id: i })
        getdata(); // Refresh data after delete
    }

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Calculate paginated data
    const reversedNotices = notices.slice().reverse();
    const totalPages = Math.ceil(reversedNotices.length / itemsPerPage);
    const paginatedNotices = reversedNotices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold text-secondary mb-8 text-center">Latest Notices</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {paginatedNotices.map((notice) => (
                    <div
                        key={notice.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden  pb-6 flex flex-col items-center cursor-pointer hover:bg-secondary-50"
                    >
                        <img src={notice.Img} alt={notice.title} className="w-full h-[15vh]  object-center object-cover mb-4  " />
                        <div className="text-lg px-6 font-bold text-gray-800 mb-2 text-center">{notice.Title}</div>
                        <div className="text-sm px-6 text-gray-600 line-clamp-2 mb-4 text-center">{notice.Description}</div>
                        <NavLink to={`/notice/${notice._id}`}
                            className="mt-auto px-4 py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-yellow-400 hover:text-secondary-900 transition-colors"
                        >
                            View Notice
                        </NavLink>
                        {isAdmin && (<img src="/delete.png" onClick={() => { deleteData(notice._id) }} alt="" className=' cursor-pointer w-9 mt-3 hover:fill-amber-700' />
                        )}
                    </div>
                ))}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-2">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-200'}`}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-2 rounded font-semibold ${currentPage === i + 1 ? 'bg-secondary text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-200'}`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Notice;

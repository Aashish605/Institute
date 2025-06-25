import axios from 'axios'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'


const Mock = () => {
    const logIn = useSelector((state) => state.auth.user)
    const isAdmin = logIn?.isAdmin;
    const [weeklyResults, setweeklyResults] = useState([])

    // Move getdata outside useEffect so it can be reused
    const getdata = async () => {
        const data = await axios.get('http://localhost:4000/api/mock/get')
        setweeklyResults(data.data)
    }

    useEffect(() => {
        getdata()
    }, []);

    const deleteData = async (i) => {
        await axios.post('http://localhost:4000/api/mock/delete', { id: i })
        getdata(); // Refresh data after delete
    }

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Calculate paginated data
    const reversedResults = weeklyResults.slice().reverse();
    const totalPages = Math.ceil(reversedResults.length / itemsPerPage);
    const paginatedResults = reversedResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    return (
        <>
            <div className='max-w-[85vw] py-12 mx-auto  px-8'>
                <h1 className="text-4xl font-bold text-secondary mt-8 text-center">Weekly Mock Test Results</h1>
                <p className="text-center mt-2 opacity-60 font-medium mb-12">Topper of each mock test receives a cash incentive to motivate and reward hard work!</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {paginatedResults.map((result) => (
                        <div
                            key={result._id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-shadow  pb-6 flex flex-col items-center cursor-pointer"
                        >
                            <img src='Course/Bridge.png' className="w-full h-[25vh]  object-center object-cover mb-4  " />
                            <div className="text-sm  font-semibold opacity-65 mb-2">Week: {result.Week}</div>
                            <div className="text-lg  font-bold text-gray-800 mb-4 text-center">{result.Title}</div>
                            <NavLink to={`/mock/${result._id}`}
                                className="mt-auto px-4 py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-yellow-400 hover:text-blue-900 transition-colors"
                            >
                                View Result
                            </NavLink>
                            {isAdmin && (<img src="/delete.png" onClick={() => { deleteData(result._id) }} alt="" className=' cursor-pointer w-9 mt-3 hover:fill-amber-700' />
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
        </>
    )
}

export default Mock
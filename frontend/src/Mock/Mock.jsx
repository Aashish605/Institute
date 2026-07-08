import api from '../config/api'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useContent } from '../context/ContentContext'
import { MOCK } from '../config/site'
const Mock = () => {
    const content = useContent();
    const [weeklyResults, setweeklyResults] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 6;

    const getdata = async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.get(`/api/mock/get?page=${page}&limit=${itemsPerPage}`)
            setweeklyResults(data.data.rows)
            setTotalPages(data.data.totalPages)
        } catch {
            setError('Failed to load mock results');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getdata(currentPage)
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    if (error) return (
        <div className='max-w-[85vw] py-12 mx-auto px-8 text-center'>
            <p className="text-red-500 text-lg">{error}</p>
            <button onClick={() => getdata(currentPage)} className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg font-semibold">Retry</button>
        </div>
    )

    if (!loading && weeklyResults.length === 0) {
        return (
            <div className="max-w-[85vw] py-12 mx-auto px-8 text-center">
                <h1 className="text-4xl font-bold text-secondary mt-8 text-center">{content.mock_heading || MOCK.heading}</h1>
                <p className="text-center mt-2 opacity-60 font-medium mb-12">{content.mock_subtitle || MOCK.subtitle}</p>
                <p className="text-gray-500 text-lg">No mock results found.</p>
            </div>
        )
    }

    return (
        <>
            <div className='max-w-[85vw] py-12 mx-auto  px-8'>
                <h1 className="text-4xl font-bold text-secondary mt-8 text-center">{content.mock_heading || MOCK.heading}</h1>
                <p className="text-center mt-2 opacity-60 font-medium mb-12">{content.mock_subtitle || MOCK.subtitle}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {weeklyResults.map((result) => (
                        <div
                            key={result.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-shadow  pb-6 flex flex-col items-center cursor-pointer"
                        >
                            <img src='Course/Bridge.png' className="w-full h-[25vh]  object-center object-cover mb-4  " />
                            <div className="text-sm  font-semibold opacity-65 mb-2">Week: {result.Week}</div>
                            <div className="text-lg  font-bold text-gray-800 mb-4 text-center">{result.Title}</div>
                            <NavLink to={`/mock/${result.id}`}
                                className="mt-auto px-4 py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                            >
                                View Result
                            </NavLink>

                        </div>
                    ))}
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-10 gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded bg-primary/10 text-primary font-semibold ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/20'}`}
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-3 py-2 rounded font-semibold ${currentPage === i + 1 ? 'bg-secondary text-white' : 'bg-primary/5 text-primary hover:bg-primary/10'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded bg-primary/10 text-primary font-semibold ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/20'}`}
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
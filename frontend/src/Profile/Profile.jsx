import { useDispatch, useSelector } from 'react-redux'
import { clearUser, setUser } from '../Redux/Auth/AuthSlice'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {



    const dispatch = useDispatch();
    const logIn = useSelector((state) => state.auth.user)
    const [name, setname] = useState(logIn?.displayName || '')
    const [loading, setLoading] = useState(false);

    // Derive updated from user data (persists after refresh)
    const updated = !!(logIn?.number && logIn?.class);

    useEffect(() => {
        setname(logIn?.displayName || '');
    }, [logIn?.displayName]);

    if (!logIn) return <div>Not logged in</div>;

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.put(
                'https://institute-xi.vercel.app/auth/update',
                { name },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = res.data;
            if (data.user) {
                dispatch(setUser(data.user));
                alert('Profile updated!');
            } else {
                alert('Update failed');
            }
        } catch {
            alert('Update failed');
        }
        setLoading(false);
    };


    return (
        <div className='flex flex-col max-w-[85vw] mx-auto justify-center my-12 items-center'>
            <h1 className='mt-2 font-semibold text-5xl text-secondary'>
                My Profile
            </h1>
            <img
                src={logIn.photo || "/profile.jpg"}
                alt="Profile"
                className="rounded-[50%] my-6"
            />
            {
                <form onSubmit={handleUpdate} className="mt-4 flex flex-col gap-2 max-w-xs">
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={e => setname(e.target.value)}
                            className="border rounded px-2 my-2 py-1 w-full"
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            readOnly
                            type="text"
                            value={logIn.email}
                            className="border rounded my-2 px-2 py-1 w-full"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded px-4 py-2 mt-2"
                        disabled={loading || updated}
                    >
                        {updated ? 'Already Updated' : loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            }
            <button onClick={() => dispatch(clearUser())} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                Log Out
            </button>
        </div>
    );
}

export default Profile;
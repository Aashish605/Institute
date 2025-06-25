import React from 'react'

const Login = () => {
    return (
        <div>
            <div className=" flex p-8 justify-center ">
                <div className="bg-white w-full max-w-md">
                    <div className="flex flex-col items-center mb-6">
                        <h2 className="text-4xl font-bold mt-12">Sign in to your account</h2>
                        <p className="text-gray-500 mt-2 text-sm">Welcome back! Please login/Register to your account.</p>
                    </div>
                    <a href="https://institute-xi.vercel.app/auth/google" className=' flex mx-auto items-center justify-center border w-fit px-9 py-3 gap-4 rounded-xl border-gray-200 bg-gray-50'>
                        <img src="/google.png" alt="" className='w-7' /> Google</a>
                    <div className="mt-6 text-center">
                        <span className="text-gray-600 text-sm">Sign up to access full feature of the website </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

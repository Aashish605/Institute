import { useContent } from '../context/ContentContext'
import { LOGIN } from '../config/site'

const Login = () => {
    const content = useContent();
    return (
        <div>
            <div className=" flex p-8 justify-center ">
                <div className="bg-white w-full max-w-md">
                    <div className="flex flex-col items-center mb-6">
                        <h2 className="text-4xl font-bold mt-12">{content.login_heading || LOGIN.heading}</h2>
                        <p className="text-gray-500 mt-2 text-sm">{content.login_subtitle || LOGIN.subtitle}</p>
                    </div>
                    <a href="/auth/google" className=' flex mx-auto items-center justify-center border w-fit px-9 py-3 gap-4 rounded-xl border-gray-200 bg-gray-50'>
                        <img src="/google.png" alt="" className='w-7' /> {LOGIN.buttonText}</a>
                    <div className="mt-6 text-center">
                        <span className="text-gray-600 text-sm">{LOGIN.footer}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

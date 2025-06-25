import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';


const Contact = () => {

    const notifySuccess = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    };

    const notifyError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    };


    const { register, handleSubmit, formState: { errors },reset } = useForm();
    const onSubmit = (data) => {
        try {
            axios.post('https://institute-xi.vercel.app/api/contact', data)
            notifySuccess("Contact Submitted successfully");
            reset();
        } catch (error) {
            notifyError("Error druing Submitting")
            console.error("Error during item saving", error);
        }
    }

    console.log(errors);
    return (
        <>
            <div className="w-full bg-gray-50">
                <div className="max-w-[85vw] mx-auto py-12 ">
                    {/* Section Title */}
                    <h1 className="text-4xl font-bold mb-2 text-center decoration-[3px] underline underline-offset-[12px] decoration-secondary">Get in Touch</h1>
                    <p className="text-center text-xl my-8 text-gray-600">
                        Have questions about our programs or want to learn more about PI Academy? We'd love to hear from you.
                    </p>

                    {/* Responsive Grid: Form and Info */}
                    <div className="grid md:grid-cols-2 gap-10 mb-12">
                        {/* Contact Form */}
                        <form className="bg-white shadow-xl rounded-2xl p-6 " onSubmit={handleSubmit(onSubmit)}>
                            <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
                            <label htmlFor="">Full Name</label>
                            <input required className='w-full border rounded-md opacity-80 border-gray-400 px-3 mt-2 mb-6  py-2  ' type="text" placeholder="Your Name" {...register("fullName")} />
                            <label htmlFor="">Email Address</label>
                            <input required className='w-full border rounded-md opacity-80 border-gray-400 px-3 mt-2 mb-6  py-2' type="email" placeholder="YourEmail@gmail.com" {...register("email")} />
                            <label htmlFor="">Phone Number</label>
                            <input required className='w-full border rounded-md opacity-80 border-gray-400 px-3 mt-2 mb-6  py-2' type="number" placeholder="+977 XXXXXXXXXX" {...register("phone")} />
                            <label htmlFor="">Subject</label>
                            <input required className='w-full border rounded-md opacity-80 border-gray-400 px-3 mt-2 mb-6  py-2' type="text" placeholder="How can we help you?" {...register("subject")} />
                            <label htmlFor="">Message</label>
                            <textarea placeholder='Descirbe your inquiry' className='w-full border rounded-md opacity-80 border-gray-400 px-3 mt-2 mb-6  py-2' {...register("message")} />

                            <input required className="w-full bg-secondary cursor-pointer text-white py-2 rounded font-semibold hover:bg-secondary/90 transition" type="Submit" />
                        </form>

                        {/* Contact Information */}
                        <div className="bg-white shadow-xl rounded-2xl p-6 gap-y-8 flex flex-col gap-2">
                            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                            <div className='flex gap-4 items-center'>
                                <img src="contact/location.png" className='w-5 h-5' alt="" />
                                <div className='opacity-70'>
                                    <h3 className="font-bold">Our Location</h3>
                                    <p>Maitighar, Kathmandu, Nepal</p>
                                    <p>Opposite St. Xavier's College, Kathmandu, Nepal</p>
                                </div>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <img src="contact/phone.png" className='w-5 h-5' alt="" />
                                <div>
                                    <h3 className="font-bold">Phone</h3>
                                    <a href="tel:+977015360880" className="opacity-70 block">+977 01-5360880</a>
                                    <h3 className="font-bold">Mobile</h3>
                                    <a href="tel:+9779851198288" className="opacity-70 block">+977 9851198288</a>
                                </div>
                            </div>
                            <div>

                            </div>
                            <div className='flex gap-4 items-center'>
                                <img src="contact/mail.png" className='w-5 h-5' alt="" />
                                <div>
                                    <h3 className="font-bold">Email</h3>
                                    <a href="mailto:info@piacademy.edu.np" className="opacity-70 block">info@piacademy.edu.np</a>
                                </div>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <img src="contact/time.png" className='w-6 h-6' alt="" />
                                <div>
                                    <h3 className="opacity-70 font-bold">Office Hours</h3>
                                    <p className='opacity-70 '>Sunday - Friday: 9:00 AM - 5:00 PM</p>
                                    <p className='opacity-70 '>Saturday: Closed</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="flex-1 w-full  overflow-hidden bg-gray-200 rounded ">
                        <div className='w-full py-10 rounded-t-2xl bg-secondary ' >
                            <p className='text-2xl font-semibold px-6 mb-2 text-white'>Find Us</p>
                            <p className='text-white px-6'>Visit our institute in Birendranagar, Surkhet, Nepal</p>
                        </div>
                        <iframe className='w-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463.9261731741432!2d81.6145144607149!3d28.596655761428817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a2856f6815a925%3A0xe39c3b7fb150b978!2sExpert%20Education%20and%20Visa%20Service%2C%20Surkhet%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1750089763717!5m2!1sen!2snp" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact
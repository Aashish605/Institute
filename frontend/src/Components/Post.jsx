import { useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Post = () => {

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

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const sectionValue = watch("Section");

    const [img, setImg] = useState();
    const [upload, setupload] = useState(false);

    const uploadFile = async (type) => {
        const data = new FormData();
        data.append("file", img);
        data.append("upload_preset", "image_preset");
        try {
            const cloudName = "drsfbaluf";
            const resourceType = "image";
            const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
            const res = await axios.post(api, data);
            const { secure_url } = res.data;
            return secure_url;
        } catch (error) {
            console.error(`Error uploading ${type}:`, error.response?.data || error.message);
            throw error;
        }
    };

    const onSubmit = async (data) => {
        setupload(true)
        try {
            console.log(data.Section);
            const imgUrl = await uploadFile("image");
            data["Img"] = imgUrl
            console.log(data);
            axios.post(`https://institute-xi.vercel.app/api/${data.Section}/post`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            notifySuccess("Data Submitted successfully");
            setupload(false)
            setImg(null);
            reset();
        } catch (error) {
            notifyError("Error druing Submitting")
            console.error("Error during submission:", error.message);
            setupload(false)
        }
    };

    return (
        <>
            <div className="max-w-[85vw] mx-auto ">
                <div className="grid grid-cols-1 gap-10 my-12">
                    {/* Contact Form */}
                    <form className="bg-white shadow-xl rounded-2xl p-6 " onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="text-2xl text-center text-secondary font-semibold mb-4">Upload Mock Result and Notice</h2>
                        <label htmlFor="">Title</label>
                        <input required className='w-full border rounded-md opacity-80 border-gray-400 px-3 mt-2 mb-6  py-2  ' type="text" placeholder="Title" {...register("Title")} />
                        <label htmlFor="">Week</label>
                        <input
                            className='w-full border rounded-md opacity-80 border-gray-400 px-3 mt-2 mb-6  py-2  '
                            type="text"
                            placeholder="Week 01"
                            {...register("Week", {
                                validate: value => sectionValue === "mock" ? !!value || "Week is required for mock section" : true
                            })}
                        />
                        {errors.week && <p className="text-red-500 text-sm mb-2">{errors.week.message}</p>}
                        <label htmlFor="">Description</label>
                        <textarea required placeholder='Description' className='w-full border rounded-md opacity-80 border-gray-400 px-3 mt-2 mb-6  py-2' {...register("Description")} />
                        <label htmlFor="">Section</label>
                        <select required className='w-full border rounded-md opacity-80 border-gray-400 px-3 mt-2 mb-6  py-2'  {...register("Section")}>
                            <option value="mock">mock</option>
                            <option value="notice">notice</option>
                        </select>
                        <label htmlFor="">Select the image</label>
                        <input required type="file" accept="image/*" id="img" onChange={(e) => setImg(e.target.files[0])} className="w-full border rounded-md opacity-80 border-gray-400 px-3 mt-2 mb-6  py-2 " />

                        <input disabled={upload} className={`w-full bg-secondary cursor-pointer text-white py-2 rounded font-semibold hover:bg-secondary/90 transition ${upload ? "opacity-60 cursor-not-allowed" : ""}`} type="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Post;



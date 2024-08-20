import { memo, useState } from 'react'

const BlogsCarousel = () => {

    const blogsdata = [
        {
            id: 0,
            title: 'AI in the Courtroom: A New Era of Litigation.',
            description: 'Artificial intelligence (AI) is a technological advancement that has had a big impact on many industries, including the legal sector, in the rapidly changing technological landscape.',
            auther: '@Nishita Jaiswal',
            link: "https://www.valscotech.com/BlogPage/kGdtskcO7XdIpW3D637h"
        },
        {
            id: 1,
            title: 'Enhancing Lawmaking Efficiency with AI: Paving the Way for Smarter Governance',
            description: 'In an era marked by rapid technological advancements, it comes as no surprise that artificial intelligence (AI) is revolutionizing various industries. One sector that stands to benefit immensely from AI is governance and lawmaking.',
            auther: '@Priyanshu Agarwal',
            link: "https://www.valscotech.com/BlogPage/vTeusvly02vQ4PURe9jM"
        },
        {
            id: 2,
            title: 'The benefits of implementing a National Legal Case Database: Empowering Lawyers & Empowering Database.',
            description: 'A thorough and easily available legal information collection is now more important than ever for both attorneys and the general public in the current digital age. Lawyers can improve their efficiency, efficacy, and capacity to serve their clients by setting up a personal database and record of all cases.',
            auther: '@Akshat Singh',
            link: "https://www.valscotech.com/BlogPage/BB3kYZMXjDw8Jr6I0fsQ"
        },
    ]

    const [isGrabbing, setIsGrabbing] = useState(false);

    const handleMouseDown = () => {
        setIsGrabbing(true);
    };

    const handleMouseUp = () => {
        setIsGrabbing(false);
    };


    return (
        <div className='my-14 mx-4 md:mx-10 lg:mx-14'>
            <div className='my-3'>
                <h1 className='font-semibold text-2xl sm:text-2xl lg:text-3xl'>Explore our latest blog posts to delve deeper into the world of technology and discover insights about our cutting-edge products.</h1>
            </div>
            <div className=''>
                <div className="flex justify-center px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl w-full my-12 sm:my-16 lg:my-20">
                        {blogsdata.map(blog => (
                            <div key={blog.id} className={`text-black bg-white border border-white rounded-[50px] p-6 sm:p-8 lg:p-8 ${isGrabbing ? 'cursor-grabbing' : 'cursor-grab'}`} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                                <h1 className="font-bold text-lg sm:text-xl lg:text-2xl truncate mb-4 sm:mb-5">{blog.title}</h1>
                                <p className="text-base sm:text-lg lg:text-xl sm:mx-auto lg:mx-5 mb-6 sm:mb-8 lg:mb-10 line-clamp-3">
                                    {blog.description}
                                </p>
                                <p className="text-center font-bold text-xs sm:text-sm lg:text-base mb-6 sm:mb-8 lg:mb-8">{blog.auther}</p>
                                <div className="flex justify-center">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 sm:px-8 lg:px-10 rounded-lg"> <a target='_blank' href={blog.link}>Read Blog</a></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default memo(BlogsCarousel)

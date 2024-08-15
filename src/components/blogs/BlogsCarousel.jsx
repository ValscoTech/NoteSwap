import { memo } from 'react'

const BlogsCarousel = () => {

    const blogsdata = [{
        title: 'Enhancing Lawmaking Efficiency with AI: Paving the Way for Smarter Governance',
        description: 'Artificial intelligence (AI) is a technological advancement that has had a big impact on many industries, including the legal sector, in the rapidly changing technological landscape.',
        auther: '@Ayan Bhowal',
    }]

    return (
        <div className='my-14 mx-4 md:mx-10 lg:mx-14'>
            <div className='my-3'>
                <h1 className='font-semibold text-2xl sm:text-2xl lg:text-3xl'>Explore our latest blog posts to delve deeper into the world of technology and discover insights about our cutting-edge products.</h1>
            </div>
            <div className='flex justify-center'>
                <div className='my-32'>
                    <div className='lg:h-[300px] lg:w-[550px] border-x border-y border-white rounded-xl sm:h-[400px] sm:w-[450px] '>
                        {/*blogsdata.map((blog, index) => (
                        <div key={index} className='flex flex-col justify-center items-center'>
                            <h1 className='font-semibold text-2xl sm:text-2xl lg:text-3xl'>{blog.title}</h1>
                            <p className='text-lg sm:text-lg lg:text-xl'>{blog.description}</p>
                            <p className='text-lg sm:text-lg lg:text-xl'>{blog.auther}</p>
                        </div>
                        ))*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(BlogsCarousel)
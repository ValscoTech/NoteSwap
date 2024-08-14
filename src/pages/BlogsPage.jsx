import Blog from '@/components/blogs/Blog'
import BlogsCarousel from '@/components/blogs/BlogsCarousel'
import Footer from '@/components/layout/footer'
import { memo } from 'react'
import '@/styles/blog.css'
import Navbar from '@/components/layout/navbar'

const BlogsPage = () => {
  return (
    <div>
      <Navbar />
      <Blog />
      <BlogsCarousel />
      <Footer />
    </div>
  )
}

export default memo(BlogsPage)
import Blog from '@/components/blogs/Blog'
import BlogsCarousel from '@/components/blogs/BlogsCarousel'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import { memo } from 'react'

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
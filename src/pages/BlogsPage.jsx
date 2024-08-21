import Blog from '@/components/blogs/Blog'
import BlogsCarousel from '@/components/blogs/BlogsCarousel'
import { memo } from 'react'

const BlogsPage = () => {
  return (
    <div>
      <Blog />
      <BlogsCarousel />
    </div>
  )
}

export default memo(BlogsPage)
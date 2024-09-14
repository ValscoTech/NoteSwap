import Blog from '@/components/blogs/Blog'
import BlogsCarousel from '@/components/blogs/BlogsCarousel'
import { memo, useContext } from 'react'
import "../styles/ThemeContext.css";
import { ThemeContext } from './ThemeContext';


const BlogsPage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme}>
      <Blog />
      <BlogsCarousel />
    </div>
  )
}

export default memo(BlogsPage)
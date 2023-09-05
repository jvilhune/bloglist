
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'JV Records',
    author: 'Jukka Vilhunen',
    url: 'https://www.jvrecords.fi',
    likes: 100
  },
  {
    title: 'Astral Dream Records',
    author: 'Lucio Corsini',
    url: 'https://www.astraldream.com/',
    likes: 200
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}

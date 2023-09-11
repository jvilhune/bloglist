
const Blog = require('../models/blog')
const User = require('../models/user')


/*
{
  "username": "mariko",
  "name": "Mari Korhonen",
  "blogs": [],
  "id": "64fd46364344fbb31ea930ff"
}
*/

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

const initialUsers = [
  {
    username: 'sannaaa',
    name: 'Sanna Aaltonen',
    password: 'sannaaa'
  },
  {
    username: 'juhako',
    name: 'Juha Koivistoinen',
    password: 'juhako'
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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}

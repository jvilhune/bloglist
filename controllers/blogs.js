const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const middleware = require('../utils/middleware')

const jwt = require('jsonwebtoken')

/* 
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
*/

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body

  //const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  /* 
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  */

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if(blog.likes === null) {
      blog.likes = 0
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const body = request.body

  //console.log('request.token', request.token)

  //const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  /*
  const user = await User.findById(decodedToken.id)
  */

  /* Find user who owns token from the database */
  const user = request.user

  /* Find deleted blog from the database */
  const blog = await Blog.findById(request.params.id)

  /*  */


  if(blog === null) {
    return response.status(401).json({ error: 'Unknown blog' })
  }

  if(user === null) {
    return response.status(401).json({ error: 'Unknown user' })
  }

  if (user.id != decodedToken.id) {
    return response.status(401).json({ error: 'Unknown user. Id not match' })
  }

  if (blog.id != request.params.id) {
    return response.status(401).json({ error: 'Unknown blog. Id not match' })
  }

  if (blog.user.toString() != user.id) {
    return response.status(401).json({ error: 'Can not delete the blog. The owner of the blog is not the logged person' })
  }

  /*
  console.log('user.name', user.name)
  console.log('user.id', user.id)
  console.log('decodedToken.id', decodedToken.id)
  console.log('blog.id', blog.id)
  console.log('request.params.id', request.params.id)
  console.log('blog.user', blog.user.toString())
  */

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


// This routine works too but not use token yet. Must be updated but later ...
// Calling function in the blog_api.test.js test file must also be updated 
blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const str1 = 'title';
  const str2 = 'url';
  var found1 = ""
  var found2 = ""

  const body = request.body

  var keyNames = Object.keys(body)
  found1 = keyNames.find(v => str1.includes(v));
  found2 = keyNames.find(v => str2.includes(v));

  if(found1 != str1 || found2 != str2) {
    response.status(400).end()
  }
  else
  {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })

    if(blog.likes === null) {
      blog.likes = 0
    }
    else {
    }
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  const savedBlog = blog
  //console.log('savedBlog', savedBlog)
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter

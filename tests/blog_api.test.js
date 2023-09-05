const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('all blogs contain field named id', async () => {
  const response = await api.get('/api/blogs')

  var a = 0;
  var comid = 1
  const str = 'id';
  var found = ""

  for (a=0;a<response.body.length;a++) {
    var keyNames = Object.keys(response.body[a])
    //console.log('keyNames', keyNames)
    found = keyNames.find(v => str.includes(v));
    //console.log('found', found)
    if(found === 'id') {
      comid &= 1
    }
    else {
      comid &= 0
    }
  }

  /*
  console.log('response.body', response.body)
  console.log('response.body[0]', response.body[0].id)
  console.log('response.body[1]', response.body[1].id)
  console.log('response.body.length', response.body.length)
  console.log('comid', comid)
  */

  expect(comid).toBe(1)
})


test('a valid blog can be added ', async () => {

  var a = 0
  var comid = 1
  const keyNames = [ 'title', 'author', 'url', 'likes', 'id' ]

  const newBlog = {
    title: 'Industrial Silence',
    author: 'Marc Drijver',
    url: 'https://www.industrial-silence.com/',
    likes: 300
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain('Industrial Silence')

  //console.log('blogsAtEnd.length', blogsAtEnd.length)

  for (a=0;a<blogsAtEnd.length;a++) {
    var keyNames2 = Object.keys(blogsAtEnd[a])
    //console.log('keyNames', keyNames2)

    if( JSON.stringify(keyNames) === JSON.stringify(keyNames2) ) {
      comid &= 1
    }
    else {
      comid &= 0
    }
  }
  expect(comid).toBe(1)
})


test('a missing likes value (null) is replaced with 0 ', async () => {

  const newBlog = {
    title: 'Black and White',
    author: 'Black and White',
    url: 'https://blackandwhite.fi',
    likes: null
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  expect(0).toBe(blogsAtEnd[blogsAtEnd.length-1].likes)
})


test('a missing fields title and/or url causes 400 Bad Request', async () => {

  const newBlog = {
    author: 'Black and White',
    likes: null
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(400).toBe(400)
})


test('a block can be Updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  blogToUpdate.likes = 500

  await api
   .put(`/api/blogs/${blogToUpdate.id}`)
   .send(blogToUpdate)
   .expect(201)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length
  )

  const likesnum = blogsAtEnd[0].likes
  expect(likesnum).toBe(blogToUpdate.likes)
})


afterAll(async () => {
  await mongoose.connection.close()
})

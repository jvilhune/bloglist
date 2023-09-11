const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')



beforeEach(async () => {
  /* For some reason too many of these commands in a row causes errors. */
  /* Maybe the errors caused by database buffering? */
  /* That's why we deleted all blogs here in the beginning before running tests and */
  /* all users in the end of the tests */
  /* Make sure the database is empty before the test */
  /* If there are blogs and/or users in the database it may cause errors */
  /* when you run the tests for the first time. */
  /* Run all tests at once with the command ../bloglist/>npm test */

  await Blog.deleteMany({})
  //await User.deleteMany({})
  //await Blog.insertMany(helper.initialBlogs)
  //await User.insertMany(helper.initialUsers)
})

test('Two valid users succesfully added ', async () => {

  var a = 0
  var comid = 1

  const keyNames = [ 'username', 'name', 'blogs', 'id' ]

  const newUser = {
    username: 'tapiosu',
    name: 'Tapio Suominen',
    password: 'tapiosu'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const newUser2 = {
    username: 'heikkisi',
    name: 'Heikki Silvennoinen',
    password: 'heikkisi'
  }

  await api
    .post('/api/users')
    .send(newUser2)
    .expect(201)
    .expect('Content-Type', /application\/json/)
})


test('all users are returned', async () => {
  const response = await api.get('/api/users')

  expect(response.body).toHaveLength(helper.initialUsers.length-2+2)
})


test('all users key fields in database are correct', async () => {

  var a = 0
  var comid = 1

  const keyNames = [ 'username', 'name', 'blogs', 'id' ]

  const response = await api.get('/api/users')

  expect(response.body).toHaveLength(helper.initialUsers.length - 2 + response.body.length)
  expect(response.body).toHaveLength(2)

  for (a=0;a<response.body.length;a++) {
    var keyNames2 = Object.keys(response.body[a])
    if( JSON.stringify(keyNames) === JSON.stringify(keyNames2) ) {
      comid &= 1
    }
    else {
      comid &= 0
    }
  }
  expect(comid).toBe(1)
})


test('login first, then create two blogs and read back, and finally delete the same blogs ', async () => {

  var a = 0
  var comid = 1

  const keyNames = [ 'title', 'author', 'url', 'likes', 'id' ]

  const newLogin = {
    username: 'heikkisi',
    password: 'heikkisi'
  }

  const response = await api
    .post('/api/login')
    .send(newLogin)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const token = response.body.token

  const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
  }

  const response2 = await api
    .post('/api/blogs')
    .set({ Authorization: `Bearer ${token}` })
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const newBlog2 = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  }

  const response3 = await api
    .post('/api/blogs')
    .set({ Authorization: `Bearer ${token}` })
    .send(newBlog2)
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const response4 = await api.get('/api/blogs')
  expect(response4.body).toHaveLength(helper.initialBlogs.length-2+2)

  var blogsAtEnd = [{}]
  blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(2)

  await api
    .delete(`/api/blogs/${response2.body.id}`)
    .set({ Authorization: `Bearer ${token}` })
    .expect(204)

  await api
    .delete(`/api/blogs/${response3.body.id}`)
    .set({ Authorization: `Bearer ${token}` })
    .expect(204)

  blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(0)

  /*
  for (a=0;a<blogsAtEnd.length;a++) {
  await api
    .delete(`/api/blogs/${blogsAtEnd[a].id}`)
    .set({ Authorization: `Bearer ${token}` })
    .expect(204)
  }
  */
})


test('a missing likes number value (null) is replaced with 0 in the database', async () => {

  var a = 0
  var comid = 1

  const keyNames = [ 'title', 'author', 'url', 'likes', 'id' ]

  const newLogin = {
    username: 'tapiosu',
    password: 'tapiosu'
  }

  const response = await api
    .post('/api/login')
    .send(newLogin)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const token = response.body.token

  const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: null
  }

  const response2 = await api
    .post('/api/blogs')
    .set({ Authorization: `Bearer ${token}` })
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(0).toBe(blogsAtEnd[blogsAtEnd.length-1].likes)

  await api
    .delete(`/api/blogs/${response2.body.id}`)
    .set({ Authorization: `Bearer ${token}` })
    .expect(204)
})


test('a missing fields title and/or url causes 400 Bad Request', async () => {

  var a = 0
  var comid = 1

  const keyNames = [ 'title', 'author', 'url', 'likes', 'id' ]

  const newLogin = {
    username: 'tapiosu',
    password: 'tapiosu'
  }

  //title: "Canonical string reduction",
  //url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",

  const newBlog = {
      title: "",
      author: "Edsger W. Dijkstra",
      url: "",
      likes: 12
  }

  const response = await api
    .post('/api/login')
    .send(newLogin)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const token = response.body.token

  const response2 = await api
    .post('/api/blogs')
    .set({ Authorization: `Bearer ${token}` })
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  await api
    .delete(`/api/blogs/${response2.body.id}`)
    .set({ Authorization: `Bearer ${token}` })
    .expect(400)
})


test('a missing token causes 401 Unauthorized response error', async () => {

  var a = 0
  var comid = 1

  const keyNames = [ 'title', 'author', 'url', 'likes', 'id' ]

  const newLogin = {
    username: 'tapiosu',
    password: 'tapiosu'
  }

  const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
  }

  const response = await api
    .post('/api/login')
    .send(newLogin)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const token = response.body.token

  const response2 = await api
    .post('/api/blogs')
    //.set({ Authorization: `Bearer ${token}` })
    .send(newBlog)
    .expect(401) //401 Unauthorized 400 Bad Request
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  await api
    .delete(`/api/blogs/${response2.body.id}`)
    .set({ Authorization: `Bearer ${token}` })
    .expect(400)
})


test('all blogs are returned as json and contain field named id', async () => {

  var a = 0;
  var comid = 1
  const str = 'id';
  var found = ""

  const newLogin = {
    username: 'tapiosu',
    password: 'tapiosu'
  }

  const newBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
  }

  const response = await api
    .post('/api/login')
    .send(newLogin)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const token = response.body.token

  const response2 = await api
    .post('/api/blogs')
    .set({ Authorization: `Bearer ${token}` })
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)


  for (a=0;a<response2.body.length;a++) {
    var keyNames = Object.keys(response2.body[a])
    found = keyNames.find(v => str.includes(v));
    if(found === 'id') {
      comid &= 1
    }
    else {
      comid &= 0
    }
  }

  expect(comid).toBe(1)

  const blogsAtEnd = await helper.blogsInDb()

  await api
    .delete(`/api/blogs/${response2.body.id}`)
    .set({ Authorization: `Bearer ${token}` })
    .expect(204)
})


test('all users are succesfully deleted', async () => {

  var usersAtEnd = [{}]
  usersAtEnd = await helper.usersInDb()
  await User.deleteMany({})
  usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(0)
})


/*
// This routine works too but not use token yet. Must be updated but later ...
// Response function in the /controllers/blog.js file must also be updated 
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
*/

afterAll(async () => {
  await mongoose.connection.close()
})


/* Finding the max value of an attribute in an array of objects */
/* https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects */

/* Get the element with the highest occurrence in an array */
/* https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array */

/* How to the get the sum of all the field with the same name in a nested array? */
/* https://stackoverflow.com/questions/72488705/how-to-the-get-the-sum-of-all-the-field-with-the-same-name-in-a-nested-array */

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {
  const listWithZeroBlog = []

  test('of empty list is zero', () => {
    var result = listHelper.totalLikes(listWithZeroBlog)
    expect(result).toBe(0)
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    var result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

  test('of a bigger list is calculated right', () => {
    var result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
    //expect(listHelper.average([7, 5, 12, 10, 0, 2])).toBe(36)
  })


  /* The blog who has the most likes */ 
  /* Blogi jossa on eniten tykkayksia */
  test('of a favourite blog is calculated right', () => {
    var result = listHelper.favoriteBlog(blogs)

    var keyNames = Object.keys(result);
    //console.log(keyNames); // Outputs ["a","b","c"]


    const favouriteObject =
    {
      title:  "Canonical string reduction",
      author:  "Edsger W. Dijkstra",
      likes: 12
    }

    expect(result).toEqual(favouriteObject)
  })

  /* Author who has the most blogs and how many blogs */
  /* Author, jolla on eniten blogeja ja kuinka monta blogia */
  test('of a mostBlogs blog is calculated right', () => {
    var result = listHelper.mostBlogs(blogs)

    const mostBlogsObject =
    {
      author: "Robert C. Martin",
      blogs: 3
    }

    expect(result).toEqual(mostBlogsObject)
  })

  /* The author who has the most likes */ 
  /* Kirjoittaja jolla on eniten tykkayksia */
  test('of a mostLikes blog is calculated right', () => {
    var result = listHelper.mostLikes(blogs)

    const mostLikesObject =
    {
      author: "Edsger W. Dijkstra",
      likes: 17
    }

    expect(result).toEqual(mostLikesObject)
  })

})

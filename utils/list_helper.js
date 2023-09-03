
/* npm install --save-dev jest */
/* Add into file package.json in to the place of scripts -> "test": "jest --verbose" */
/* Add into the end of the file package.json -> "jest": { "testEnvironment": "node" } */

/* npm install eslint --save-dev */
/* -> Tulee virheita, koska on asennettu jo kerran projektin persons yhteydessa */
/* C:\Users\PC\AppData\Local\npm-cache\_logs\2023-08-31T16_20_11_842Z-debug-0.log */

/* Add into file package.json in to the place of scripts -> "lint": "eslint ." */
/* Copy file .eslintrc.js from project persons */
/* Add into file .eslintrc.js in to the place of env */
/* 'node': true, */
/* 'jest': true */
/* Tarkistetaan tiedosto index.js komennolla npx eslint index.js */

/* Ajetaan tiedostossa average.test.js olevat testit komennolla npm test */
/* Ajetaan tiedostossa reverse.test.js olevat testit komennolla npm test */


const dummy = (blogs) => {
  var retval = 1
  return retval
}

const totalLikes = (blogs) => {
  var retval
  if(blogs.length === 0) {
    retval = 0
  }
  else if(blogs.length === 1) {
    retval = blogs[0].likes
  }
  else {
    retval = sumFromArray('likes', blogs)
    console.log(retval)
  }
  return retval
}


var sumFromArray = (fieldName, array) => {
  let sum = 0;
  array.forEach(item => {
    sum += item[fieldName] ?? 0;
  })
  return sum;
}

/* The blog who has the most likes */ 
/* Blogi jossa on eniten tykkayksia */
const favoriteBlog = (blogs) => {
  var retval
    
  var maxValue = Math.max(...blogs.map(o => o.likes), 0);
  var maxObject = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)

  var xMax = Math.max(...Array.from(blogs, o => o.likes));
  var maxXObject = blogs.find(o => o.likes === xMax);

  const returnObject =
  {
    title:  maxXObject.title,
    author:  maxXObject.author,
    likes: maxXObject.likes
  }

  /*
  console.log('maxValue', maxValue)
  console.log('maxObject', maxObject)
  console.log('xMax', xMax)
  console.log('maxXObject', maxXObject)
  console.log('maxXObject', returnObject)
  */

  retval = returnObject
  return retval
}


/* Author who has the most blogs and how many blogs */
/* Author, jolla on eniten blogeja ja kuinka monta blogia */
const mostBlogs = (blogs) => {

  var a = 0
  var arr = []

  for (a=0;a<blogs.length;a++) {
    arr[a] = blogs[a].author
  }

  var retval = ""
  var duplicates = {};
  max = '';
  maxi = 0;
  arr.forEach((el) => {
      duplicates[el] = duplicates[el] + 1 || 1;
    if (maxi < duplicates[el]) {
      max = el;
      maxi = duplicates[el];
    }
  });

  console.log('max', max);
  console.log('maxi', maxi);

  const returnObject =
  {
      author: max,
      blogs: maxi
  }
  retval = returnObject
  return retval
}

/* The author who has the most likes */ 
/* Kirjoittaja jolla on eniten tykkayksia */
const mostLikes = (blogs) => {

  var retval = 0

  /* First convert object into next format : */
  /*
   transformObject: [
     { author: 'Michael Chan', likes: 7 },
     { author: 'Edsger W. Dijkstra', likes: 17 },
     { author: 'Robert C. Martin', likes: 12 }
   ]
  */

  var transformObject = transform(blogs)
  console.log('transformObject:', transformObject)

  /* And then find the author who has the most likes */

  var debugObject = favoriteBlog(transformObject)
  console.log('debugObject:', debugObject)

  const returnObject =
  {
      author: debugObject.author,
      likes: debugObject.likes
  }
  retval = returnObject
  return retval
}

const transform = (data) => {
  const quantitySum = new Map()  

  data.forEach(({ author, likes }) => {
    if (quantitySum.has(author)) {
      quantitySum.set(author, quantitySum.get(author) + likes)
    } else {
      quantitySum.set(author, likes)
    }
  })  
  return Array.from(quantitySum.entries())
    .map(([author, sum]) => ({
    author,
    likes: sum
  }))
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

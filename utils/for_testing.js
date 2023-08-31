
/* npm install --save-dev jest */
/* Add into file package.json in to the place of scripts -> "test": "jest --verbose" */
/* Add into the end of the file package.json -> "jest": { "testEnvironment": "node" } */

/* npm install eslint --save-dev */
/* -> Tulee virheita, koska on asennettu jokerran projektin persons yhteydessa */
/* C:\Users\PC\AppData\Local\npm-cache\_logs\2023-08-31T16_20_11_842Z-debug-0.log */

/* Add into file package.json in to the place of scripts -> "lint": "eslint ." */
/* Copy file .eslintrc.js from project persons */
/* Add into file .eslintrc.js in to the place of env */
/* 'node': true, */
/* 'jest': true */
/* Tarkistetaan tiedosto index.js komennolla npx eslint index.js */

/* Ajetaan tiedostossa average.test.js olevat testit komennolla npm test */
/* Ajetaan tiedostossa reverse.test.js olevat testit komennolla npm test */

const reverse = (string) => {
  return string
    .split('')
    .reverse()
    .join('')
}

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.length === 0
    ? 0 
    : array.reduce(reducer, 0) / array.length
}

module.exports = {
  reverse,
  average,
}
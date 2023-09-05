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

/* npm install --save-dev cross-env */
/* package.json */
/*  "scripts": { */
/*    "start": "cross-env NODE_ENV=production node index.js", */
/*    "dev": "cross-env NODE_ENV=development nodemon index.js", */
/*    "test": "cross-env NODE_ENV=test jest --verbose --runInBand" */

/* npm install --save-dev supertest */

/* Jos testeja suoriattaessa tulee seuraava ilmoitus : */
/* Jest did not exit one secod after the test run has complete ... */

/* Lisaa tiedosto teardown.js hakemistoon /tests/. Ja kirjoita tiedoston sisalloksi ... */
/* module.exports = () => { */
/*   process.exit(0) */
/* }

/* ... Ja lajenna tiedoston package.json Jestia koskeva maarittely */
/*  "jest": { */
/*    "testEnvironment": "node" */
/*    "globalTeardown": "./tests/teardown.js" */

/* Testin suorittaminen yksitellen : */
/* npm test -- tests/blog_api.test.js */
/* npm test -- tests/reverse.test.js */
/* npm test -- tests/average.test.js */
/* npm test -- -t 'blogs' */
/* npm test -- -t 'a specific blog is within the returned notes' */

/* npm install express-async-errors */
/* Lisaa tiedostoon app.js */
/* require('express-async-errors') */

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

const dummy = (blogs) => {
  var retval = 1
  return retval
}

module.exports = {
  dummy
}


const phone = (phonenumber) => {
  var retval = "";
  var phonenum = phonenumber;
  var a = 0;
  var numcount = 0;
  var hyphencount = 0;
  var hyphenindex = 0;
  var notnumnothypencount = 0;
  var len = phonenum.length;

  for(a=0;a<phonenum.length;a++)
  {
    if(phonenum[a] == '-')
    {
      hyphencount++;
      hyphenindex = a;
    }
    else if (phonenum[a] >= '0' && phonenum[a] <= '9')
    {      
      numcount++;
    }
    else
    {      
      notnumnothypencount++;
    }
  }

  if(len > 7 && notnumnothypencount == 0 && numcount > 6 && hyphencount == 1 && (hyphenindex == 2 || hyphenindex == 3))
  {
    /* Phone number is illegal */
    retval = 1;
  }
  else
  {
    /* Phone number is legal */
    retval = 0;
  }
  return retval;
}





module.exports = {
  reverse,
  average,
  phone,
  dummy
}
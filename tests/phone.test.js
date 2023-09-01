const phone = require('../utils/for_testing').phone

test('phone of 11-22-33-44', () => {
  const result = phone('11-22-33-44')

  expect(result).toBe(0)
})

test('phone of 040-0374034', () => {
  const result = phone('040-0374034')

  expect(result).toBe(1)
})

test('phone of 050-3002111', () => {
  const result = phone('050-3002111')

  expect(result).toBe(1)
})
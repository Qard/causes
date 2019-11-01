const tap = require('tap')
const Causes = require('./')

tap.test('gets parent causes', t => {
  const grandparent = new Error('grandparent')
  const parent = new Error('parent')
  const child = new Error('child')
  child.cause = () => parent
  parent.cause = grandparent

  const causes = Causes.from(child).toArray()
  t.deepEqual(causes, [parent, grandparent])
  t.end()
})

tap.test('supports errors without causes', t => {
  const error = new Error('no cause')

  const causes = Causes.from(error).toArray()
  t.deepEqual(causes, [])
  t.end()
})
